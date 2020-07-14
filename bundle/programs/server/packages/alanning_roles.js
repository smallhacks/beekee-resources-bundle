(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var Accounts = Package['accounts-base'].Accounts;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var check = Package.check.check;
var Match = Package.check.Match;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Roles;

var require = meteorInstall({"node_modules":{"meteor":{"alanning:roles":{"roles":{"roles_common.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/alanning_roles/roles/roles_common.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
!function (module1) {
  /* global Meteor, Roles, Mongo */

  /**
   * Provides functions related to user authorization. Compatible with built-in Meteor accounts packages.
   *
   * Roles are accessible throgh `Meteor.roles` collection and documents consist of:
   *  - `_id`: role name
   *  - `children`: list of subdocuments:
   *    - `_id`
   *
   * Children list elements are subdocuments so that they can be easier extended in the future or by plugins.
   *
   * Roles can have multiple parents and can be children (subroles) of multiple roles.
   *
   * Example: `{_id: 'admin', children: [{_id: 'editor'}]}`
   *
   * The assignment of a role to a user is stored in a collection, accessible through `Meteor.roleAssignment`.
   * It's documents consist of
   *  - `_id`: Internal MongoDB id
   *  - `role`: A role object which got assigned. Usually only contains the `_id` property
   *  - `user`: A user object, usually only contains the `_id` property
   *  - `scope`: scope name
   *  - `inheritedRoles`: A list of all the roles objects inherited by the assigned role.
   *
   * @module Roles
   */
  if (!Meteor.roles) {
    Meteor.roles = new Mongo.Collection('roles');
  }

  if (!Meteor.roleAssignment) {
    Meteor.roleAssignment = new Mongo.Collection('role-assignment');
  }
  /**
   * @class Roles
   */


  if (typeof Roles === 'undefined') {
    Roles = {}; // eslint-disable-line no-global-assign
  }

  var getGroupsForUserDeprecationWarning = false;
  Object.assign(Roles, {
    /**
     * Used as a global group (now scope) name. Not used anymore.
     *
     * @property GLOBAL_GROUP
     * @static
     * @deprecated
     */
    GLOBAL_GROUP: null,

    /**
     * Create a new role.
     *
     * @method createRole
     * @param {String} roleName Name of role.
     * @param {Object} [options] Options:
     *   - `unlessExists`: if `true`, exception will not be thrown in the role already exists
     * @return {String} ID of the new role or null.
     * @static
     */
    createRole: function (roleName, options) {
      Roles._checkRoleName(roleName);

      options = Object.assign({
        unlessExists: false
      }, options);
      var result = Meteor.roles.upsert({
        _id: roleName
      }, {
        $setOnInsert: {
          children: []
        }
      });

      if (!result.insertedId) {
        if (options.unlessExists) return null;
        throw new Error('Role \'' + roleName + '\' already exists.');
      }

      return result.insertedId;
    },

    /**
     * Delete an existing role.
     *
     * If the role is set for any user, it is automatically unset.
     *
     * @method deleteRole
     * @param {String} roleName Name of role.
     * @static
     */
    deleteRole: function (roleName) {
      var roles;
      var inheritedRoles;

      Roles._checkRoleName(roleName); // Remove all assignments


      Meteor.roleAssignment.remove({
        'role._id': roleName
      });

      do {
        // For all roles who have it as a dependency ...
        roles = Roles._getParentRoleNames(Meteor.roles.findOne({
          _id: roleName
        }));
        Meteor.roles.find({
          _id: {
            $in: roles
          }
        }).fetch().forEach(r => {
          Meteor.roles.update({
            _id: r._id
          }, {
            $pull: {
              children: {
                _id: roleName
              }
            }
          });
          inheritedRoles = Roles._getInheritedRoleNames(Meteor.roles.findOne({
            _id: r._id
          }));
          Meteor.roleAssignment.update({
            'role._id': r._id
          }, {
            $set: {
              inheritedRoles: [r._id, ...inheritedRoles].map(r2 => ({
                _id: r2
              }))
            }
          }, {
            multi: true
          });
        });
      } while (roles.length > 0); // And finally remove the role itself


      Meteor.roles.remove({
        _id: roleName
      });
    },

    /**
     * Rename an existing role.
     *
     * @method renameRole
     * @param {String} oldName Old name of a role.
     * @param {String} newName New name of a role.
     * @static
     */
    renameRole: function (oldName, newName) {
      var role;
      var count;

      Roles._checkRoleName(oldName);

      Roles._checkRoleName(newName);

      if (oldName === newName) return;
      role = Meteor.roles.findOne({
        _id: oldName
      });

      if (!role) {
        throw new Error('Role \'' + oldName + '\' does not exist.');
      }

      role._id = newName;
      Meteor.roles.insert(role);

      do {
        count = Meteor.roleAssignment.update({
          'role._id': oldName
        }, {
          $set: {
            'role._id': newName
          }
        }, {
          multi: true
        });
      } while (count > 0);

      do {
        count = Meteor.roleAssignment.update({
          'inheritedRoles._id': oldName
        }, {
          $set: {
            'inheritedRoles.$._id': newName
          }
        }, {
          multi: true
        });
      } while (count > 0);

      do {
        count = Meteor.roles.update({
          'children._id': oldName
        }, {
          $set: {
            'children.$._id': newName
          }
        }, {
          multi: true
        });
      } while (count > 0);

      Meteor.roles.remove({
        _id: oldName
      });
    },

    /**
     * Add role parent to roles.
     *
     * Previous parents are kept (role can have multiple parents). For users which have the
     * parent role set, new subroles are added automatically.
     *
     * @method addRolesToParent
     * @param {Array|String} rolesNames Name(s) of role(s).
     * @param {String} parentName Name of parent role.
     * @static
     */
    addRolesToParent: function (rolesNames, parentName) {
      // ensure arrays
      if (!Array.isArray(rolesNames)) rolesNames = [rolesNames];
      rolesNames.forEach(function (roleName) {
        Roles._addRoleToParent(roleName, parentName);
      });
    },

    /**
     * @method _addRoleToParent
     * @param {String} roleName Name of role.
     * @param {String} parentName Name of parent role.
     * @private
     * @static
     */
    _addRoleToParent: function (roleName, parentName) {
      var role;
      var count;

      Roles._checkRoleName(roleName);

      Roles._checkRoleName(parentName); // query to get role's children


      role = Meteor.roles.findOne({
        _id: roleName
      });

      if (!role) {
        throw new Error('Role \'' + roleName + '\' does not exist.');
      } // detect cycles


      if (Roles._getInheritedRoleNames(role).includes(parentName)) {
        throw new Error('Roles \'' + roleName + '\' and \'' + parentName + '\' would form a cycle.');
      }

      count = Meteor.roles.update({
        _id: parentName,
        'children._id': {
          $ne: role._id
        }
      }, {
        $push: {
          children: {
            _id: role._id
          }
        }
      }); // if there was no change, parent role might not exist, or role is
      // already a subrole; in any case we do not have anything more to do

      if (!count) return;
      Meteor.roleAssignment.update({
        'inheritedRoles._id': parentName
      }, {
        $push: {
          inheritedRoles: {
            $each: [role._id, ...Roles._getInheritedRoleNames(role)].map(r => ({
              _id: r
            }))
          }
        }
      }, {
        multi: true
      });
    },

    /**
     * Remove role parent from roles.
     *
     * Other parents are kept (role can have multiple parents). For users which have the
     * parent role set, removed subrole is removed automatically.
     *
     * @method removeRolesFromParent
     * @param {Array|String} rolesNames Name(s) of role(s).
     * @param {String} parentName Name of parent role.
     * @static
     */
    removeRolesFromParent: function (rolesNames, parentName) {
      // ensure arrays
      if (!Array.isArray(rolesNames)) rolesNames = [rolesNames];
      rolesNames.forEach(function (roleName) {
        Roles._removeRoleFromParent(roleName, parentName);
      });
    },

    /**
     * @method _removeRoleFromParent
     * @param {String} roleName Name of role.
     * @param {String} parentName Name of parent role.
     * @private
     * @static
     */
    _removeRoleFromParent: function (roleName, parentName) {
      Roles._checkRoleName(roleName);

      Roles._checkRoleName(parentName); // check for role existence
      // this would not really be needed, but we are trying to match addRolesToParent


      let role = Meteor.roles.findOne({
        _id: roleName
      }, {
        fields: {
          _id: 1
        }
      });

      if (!role) {
        throw new Error('Role \'' + roleName + '\' does not exist.');
      }

      const count = Meteor.roles.update({
        _id: parentName
      }, {
        $pull: {
          children: {
            _id: role._id
          }
        }
      }); // if there was no change, parent role might not exist, or role was
      // already not a subrole; in any case we do not have anything more to do

      if (!count) return; // For all roles who have had it as a dependency ...

      const roles = [...Roles._getParentRoleNames(Meteor.roles.findOne({
        _id: parentName
      })), parentName];
      Meteor.roles.find({
        _id: {
          $in: roles
        }
      }).fetch().forEach(r => {
        const inheritedRoles = Roles._getInheritedRoleNames(Meteor.roles.findOne({
          _id: r._id
        }));

        Meteor.roleAssignment.update({
          'role._id': r._id,
          'inheritedRoles._id': role._id
        }, {
          $set: {
            inheritedRoles: [r._id, ...inheritedRoles].map(r2 => ({
              _id: r2
            }))
          }
        }, {
          multi: true
        });
      });
    },

    /**
     * Add users to roles.
     *
     * Adds roles to existing roles for each user.
     *
     * @example
     *     Roles.addUsersToRoles(userId, 'admin')
     *     Roles.addUsersToRoles(userId, ['view-secrets'], 'example.com')
     *     Roles.addUsersToRoles([user1, user2], ['user','editor'])
     *     Roles.addUsersToRoles([user1, user2], ['glorious-admin', 'perform-action'], 'example.org')
     *
     * @method addUsersToRoles
     * @param {Array|String} users User ID(s) or object(s) with an `_id` field.
     * @param {Array|String} roles Name(s) of roles to add users to. Roles have to exist.
     * @param {Object|String} [options] Options:
     *   - `scope`: name of the scope, or `null` for the global role
     *   - `ifExists`: if `true`, do not throw an exception if the role does not exist
     *
     * Alternatively, it can be a scope name string.
     * @static
     */
    addUsersToRoles: function (users, roles, options) {
      var id;
      if (!users) throw new Error('Missing \'users\' param.');
      if (!roles) throw new Error('Missing \'roles\' param.');
      options = Roles._normalizeOptions(options); // ensure arrays

      if (!Array.isArray(users)) users = [users];
      if (!Array.isArray(roles)) roles = [roles];

      Roles._checkScopeName(options.scope);

      options = Object.assign({
        ifExists: false
      }, options);
      users.forEach(function (user) {
        if (typeof user === 'object') {
          id = user._id;
        } else {
          id = user;
        }

        roles.forEach(function (role) {
          Roles._addUserToRole(id, role, options);
        });
      });
    },

    /**
     * Set users' roles.
     *
     * Replaces all existing roles with a new set of roles.
     *
     * @example
     *     Roles.setUserRoles(userId, 'admin')
     *     Roles.setUserRoles(userId, ['view-secrets'], 'example.com')
     *     Roles.setUserRoles([user1, user2], ['user','editor'])
     *     Roles.setUserRoles([user1, user2], ['glorious-admin', 'perform-action'], 'example.org')
     *
     * @method setUserRoles
     * @param {Array|String} users User ID(s) or object(s) with an `_id` field.
     * @param {Array|String} roles Name(s) of roles to add users to. Roles have to exist.
     * @param {Object|String} [options] Options:
     *   - `scope`: name of the scope, or `null` for the global role
     *   - `anyScope`: if `true`, remove all roles the user has, of any scope, if `false`, only the one in the same scope
     *   - `ifExists`: if `true`, do not throw an exception if the role does not exist
     *
     * Alternatively, it can be a scope name string.
     * @static
     */
    setUserRoles: function (users, roles, options) {
      var id;
      if (!users) throw new Error('Missing \'users\' param.');
      if (!roles) throw new Error('Missing \'roles\' param.');
      options = Roles._normalizeOptions(options); // ensure arrays

      if (!Array.isArray(users)) users = [users];
      if (!Array.isArray(roles)) roles = [roles];

      Roles._checkScopeName(options.scope);

      options = Object.assign({
        ifExists: false,
        anyScope: false
      }, options);
      users.forEach(function (user) {
        if (typeof user === 'object') {
          id = user._id;
        } else {
          id = user;
        } // we first clear all roles for the user


        const selector = {
          'user._id': id
        };

        if (!options.anyScope) {
          selector.scope = options.scope;
        }

        Meteor.roleAssignment.remove(selector); // and then add all

        roles.forEach(function (role) {
          Roles._addUserToRole(id, role, options);
        });
      });
    },

    /**
     * Add one user to one role.
     *
     * @method _addUserToRole
     * @param {String} userId The user ID.
     * @param {String} roleName Name of the role to add the user to. The role have to exist.
     * @param {Object} options Options:
     *   - `scope`: name of the scope, or `null` for the global role
     *   - `ifExists`: if `true`, do not throw an exception if the role does not exist
     * @private
     * @static
     */
    _addUserToRole: function (userId, roleName, options) {
      Roles._checkRoleName(roleName);

      Roles._checkScopeName(options.scope);

      if (!userId) {
        return;
      }

      const role = Meteor.roles.findOne({
        _id: roleName
      }, {
        fields: {
          children: 1
        }
      });

      if (!role) {
        if (options.ifExists) {
          return [];
        } else {
          throw new Error('Role \'' + roleName + '\' does not exist.');
        }
      } // This might create duplicates, because we don't have a unique index, but that's all right. In case there are two, withdrawing the role will effectively kill them both.


      const res = Meteor.roleAssignment.upsert({
        'user._id': userId,
        'role._id': roleName,
        scope: options.scope
      }, {
        $setOnInsert: {
          user: {
            _id: userId
          },
          role: {
            _id: roleName
          },
          scope: options.scope
        }
      });

      if (res.insertedId) {
        Meteor.roleAssignment.update({
          _id: res.insertedId
        }, {
          $set: {
            inheritedRoles: [roleName, ...Roles._getInheritedRoleNames(role)].map(r => ({
              _id: r
            }))
          }
        });
      }

      return res;
    },

    /**
     * Returns an array of role names the given role name is a child of.
     *
     * @example
     *     Roles._getParentRoleNames({ _id: 'admin', children; [] })
     *
     * @method _getParentRoleNames
     * @param {object} role The role object
     * @private
     * @static
     */
    _getParentRoleNames: function (role) {
      var parentRoles;

      if (!role) {
        return [];
      }

      parentRoles = new Set([role._id]);
      parentRoles.forEach(roleName => {
        Meteor.roles.find({
          'children._id': roleName
        }).fetch().forEach(parentRole => {
          parentRoles.add(parentRole._id);
        });
      });
      parentRoles.delete(role._id);
      return [...parentRoles];
    },

    /**
     * Returns an array of role names the given role name is a parent of.
     *
     * @example
     *     Roles._getInheritedRoleNames({ _id: 'admin', children; [] })
     *
     * @method _getInheritedRoleNames
     * @param {object} role The role object
     * @private
     * @static
     */
    _getInheritedRoleNames: function (role) {
      const inheritedRoles = new Set();
      const nestedRoles = new Set([role]);
      nestedRoles.forEach(r => {
        const roles = Meteor.roles.find({
          _id: {
            $in: r.children.map(r => r._id)
          }
        }, {
          fields: {
            children: 1
          }
        }).fetch();
        roles.forEach(r2 => {
          inheritedRoles.add(r2._id);
          nestedRoles.add(r2);
        });
      });
      return [...inheritedRoles];
    },

    /**
     * Remove users from assigned roles.
     *
     * @example
     *     Roles.removeUsersFromRoles(userId, 'admin')
     *     Roles.removeUsersFromRoles([userId, user2], ['editor'])
     *     Roles.removeUsersFromRoles(userId, ['user'], 'group1')
     *
     * @method removeUsersFromRoles
     * @param {Array|String} users User ID(s) or object(s) with an `_id` field.
     * @param {Array|String} roles Name(s) of roles to add users to. Roles have to exist.
     * @param {Object|String} [options] Options:
     *   - `scope`: name of the scope, or `null` for the global role
     *   - `anyScope`: if set, role can be in any scope (`scope` option is ignored)
     *
     * Alternatively, it can be a scope name string.
     * @static
     */
    removeUsersFromRoles: function (users, roles, options) {
      if (!users) throw new Error('Missing \'users\' param.');
      if (!roles) throw new Error('Missing \'roles\' param.');
      options = Roles._normalizeOptions(options); // ensure arrays

      if (!Array.isArray(users)) users = [users];
      if (!Array.isArray(roles)) roles = [roles];

      Roles._checkScopeName(options.scope);

      users.forEach(function (user) {
        if (!user) return;
        roles.forEach(function (role) {
          let id;

          if (typeof user === 'object') {
            id = user._id;
          } else {
            id = user;
          }

          Roles._removeUserFromRole(id, role, options);
        });
      });
    },

    /**
     * Remove one user from one role.
     *
     * @method _removeUserFromRole
     * @param {String} userId The user ID.
     * @param {String} roleName Name of the role to add the user to. The role have to exist.
     * @param {Object} options Options:
     *   - `scope`: name of the scope, or `null` for the global role
     *   - `anyScope`: if set, role can be in any scope (`scope` option is ignored)
     * @private
     * @static
     */
    _removeUserFromRole: function (userId, roleName, options) {
      Roles._checkRoleName(roleName);

      Roles._checkScopeName(options.scope);

      if (!userId) return;
      const selector = {
        'user._id': userId,
        'role._id': roleName
      };

      if (!options.anyScope) {
        selector.scope = options.scope;
      }

      Meteor.roleAssignment.remove(selector);
    },

    /**
     * Check if user has specified roles.
     *
     * @example
     *     // global roles
     *     Roles.userIsInRole(user, 'admin')
     *     Roles.userIsInRole(user, ['admin','editor'])
     *     Roles.userIsInRole(userId, 'admin')
     *     Roles.userIsInRole(userId, ['admin','editor'])
     *
     *     // scope roles (global roles are still checked)
     *     Roles.userIsInRole(user, 'admin', 'group1')
     *     Roles.userIsInRole(userId, ['admin','editor'], 'group1')
     *     Roles.userIsInRole(userId, ['admin','editor'], {scope: 'group1'})
     *
     * @method userIsInRole
     * @param {String|Object} user User ID or an actual user object.
     * @param {Array|String} roles Name of role or an array of roles to check against. If array,
     *                             will return `true` if user is in _any_ role.
     *                             Roles do not have to exist.
     * @param {Object|String} [options] Options:
     *   - `scope`: name of the scope; if supplied, limits check to just that scope
     *     the user's global roles will always be checked whether scope is specified or not
     *   - `anyScope`: if set, role can be in any scope (`scope` option is ignored)
     *
     * Alternatively, it can be a scope name string.
     * @return {Boolean} `true` if user is in _any_ of the target roles
     * @static
     */
    userIsInRole: function (user, roles, options) {
      var id;
      var selector;
      options = Roles._normalizeOptions(options); // ensure array to simplify code

      if (!Array.isArray(roles)) roles = [roles];
      roles = roles.filter(r => r != null);
      if (!roles.length) return false;

      Roles._checkScopeName(options.scope);

      options = Object.assign({
        anyScope: false
      }, options);

      if (user && typeof user === 'object') {
        id = user._id;
      } else {
        id = user;
      }

      if (!id) return false;
      selector = {
        'user._id': id
      };

      if (!options.anyScope) {
        selector.scope = {
          $in: [options.scope, null]
        };
      }

      return roles.some(roleName => {
        selector['inheritedRoles._id'] = roleName;
        return Meteor.roleAssignment.find(selector, {
          limit: 1
        }).count() > 0;
      });
    },

    /**
     * Retrieve user's roles.
     *
     * @method getRolesForUser
     * @param {String|Object} user User ID or an actual user object.
     * @param {Object|String} [options] Options:
     *   - `scope`: name of scope to provide roles for; if not specified, global roles are returned
     *   - `anyScope`: if set, role can be in any scope (`scope` and `onlyAssigned` options are ignored)
     *   - `onlyScoped`: if set, only roles in the specified scope are returned
     *   - `onlyAssigned`: return only assigned roles and not automatically inferred (like subroles)
     *   - `fullObjects`: return full roles objects (`true`) or just names (`false`) (`onlyAssigned` option is ignored) (default `false`)
     *     If you have a use-case for this option, please file a feature-request. You shouldn't need to use it as it's
     *     result strongly dependant on the internal data structure of this plugin.
     *
     * Alternatively, it can be a scope name string.
     * @return {Array} Array of user's roles, unsorted.
     * @static
     */
    getRolesForUser: function (user, options) {
      var id;
      var selector;
      var filter;
      var roles;
      options = Roles._normalizeOptions(options);

      Roles._checkScopeName(options.scope);

      options = Object.assign({
        fullObjects: false,
        onlyAssigned: false,
        anyScope: false,
        onlyScoped: false
      }, options);

      if (user && typeof user === 'object') {
        id = user._id;
      } else {
        id = user;
      }

      if (!id) return [];
      selector = {
        'user._id': id
      };
      filter = {
        fields: {
          'inheritedRoles._id': 1
        }
      };

      if (!options.anyScope) {
        selector.scope = {
          $in: [options.scope]
        };

        if (!options.onlyScoped) {
          selector.scope.$in.push(null);
        }
      }

      if (options.onlyAssigned) {
        delete filter.fields['inheritedRoles._id'];
        filter.fields['role._id'] = 1;
      }

      if (options.fullObjects) {
        delete filter.fields;
      }

      roles = Meteor.roleAssignment.find(selector, filter).fetch();

      if (options.fullObjects) {
        return roles;
      }

      return [...new Set(roles.map(r => r.inheritedRoles || [r.role]).reduce((rev, current) => rev.concat(current), []).map(r => r._id))];
    },

    /**
     * Retrieve cursor of all existing roles.
     *
     * @method getAllRoles
     * @param {Object} [queryOptions] Options which are passed directly
     *                                through to `Meteor.roles.find(query, options)`.
     * @return {Cursor} Cursor of existing roles.
     * @static
     */
    getAllRoles: function (queryOptions) {
      queryOptions = queryOptions || {
        sort: {
          _id: 1
        }
      };
      return Meteor.roles.find({}, queryOptions);
    },

    /**
     * Retrieve all users who are in target role.
     *
     * Options:
     *
     * @method getUsersInRole
     * @param {Array|String} roles Name of role or an array of roles. If array, users
     *                             returned will have at least one of the roles
     *                             specified but need not have _all_ roles.
     *                             Roles do not have to exist.
     * @param {Object|String} [options] Options:
     *   - `scope`: name of the scope to restrict roles to; user's global
     *     roles will also be checked
     *   - `anyScope`: if set, role can be in any scope (`scope` option is ignored)
     *   - `onlyScoped`: if set, only roles in the specified scope are returned
     *   - `queryOptions`: options which are passed directly
     *     through to `Meteor.users.find(query, options)`
     *
     * Alternatively, it can be a scope name string.
     * @param {Object} [queryOptions] Options which are passed directly
     *                                through to `Meteor.users.find(query, options)`
     * @return {Cursor} Cursor of users in roles.
     * @static
     */
    getUsersInRole: function (roles, options, queryOptions) {
      var ids;
      ids = Roles.getUserAssignmentsForRole(roles, options).fetch().map(a => a.user._id);
      return Meteor.users.find({
        _id: {
          $in: ids
        }
      }, options && options.queryOptions || queryOptions || {});
    },

    /**
     * Retrieve all assignments of a user which are for the target role.
     *
     * Options:
     *
     * @method getUserAssignmentsForRole
     * @param {Array|String} roles Name of role or an array of roles. If array, users
     *                             returned will have at least one of the roles
     *                             specified but need not have _all_ roles.
     *                             Roles do not have to exist.
     * @param {Object|String} [options] Options:
     *   - `scope`: name of the scope to restrict roles to; user's global
     *     roles will also be checked
     *   - `anyScope`: if set, role can be in any scope (`scope` option is ignored)
     *   - `queryOptions`: options which are passed directly
     *     through to `Meteor.roleAssignment.find(query, options)`
      * Alternatively, it can be a scope name string.
     * @return {Cursor} Cursor of user assignments for roles.
     * @static
     */
    getUserAssignmentsForRole: function (roles, options) {
      options = Roles._normalizeOptions(options);
      options = Object.assign({
        anyScope: false,
        queryOptions: {}
      }, options);
      return Roles._getUsersInRoleCursor(roles, options, options.queryOptions);
    },

    /**
     * @method _getUsersInRoleCursor
     * @param {Array|String} roles Name of role or an array of roles. If array, ids of users are
     *                             returned which have at least one of the roles
     *                             assigned but need not have _all_ roles.
     *                             Roles do not have to exist.
     * @param {Object|String} [options] Options:
     *   - `scope`: name of the scope to restrict roles to; user's global
     *     roles will also be checked
     *   - `anyScope`: if set, role can be in any scope (`scope` option is ignored)
     *
     * Alternatively, it can be a scope name string.
     * @param {Object} [filter] Options which are passed directly
     *                                through to `Meteor.roleAssignment.find(query, options)`
     * @return {Object} Cursor to the assignment documents
     * @private
     * @static
     */
    _getUsersInRoleCursor: function (roles, options, filter) {
      var selector;
      options = Roles._normalizeOptions(options);
      options = Object.assign({
        anyScope: false,
        onlyScoped: false
      }, options); // ensure array to simplify code

      if (!Array.isArray(roles)) roles = [roles];

      Roles._checkScopeName(options.scope);

      filter = Object.assign({
        fields: {
          'user._id': 1
        }
      }, filter);
      selector = {
        'inheritedRoles._id': {
          $in: roles
        }
      };

      if (!options.anyScope) {
        selector.scope = {
          $in: [options.scope]
        };

        if (!options.onlyScoped) {
          selector.scope.$in.push(null);
        }
      }

      return Meteor.roleAssignment.find(selector, filter);
    },

    /**
     * Deprecated. Use `getScopesForUser` instead.
     *
     * @method getGroupsForUser
     * @static
     * @deprecated
     */
    getGroupsForUser: function () {
      if (!getGroupsForUserDeprecationWarning) {
        getGroupsForUserDeprecationWarning = true;
        console && console.warn('getGroupsForUser has been deprecated. Use getScopesForUser instead.');
      }

      return Roles.getScopesForUser(...arguments);
    },

    /**
     * Retrieve users scopes, if any.
     *
     * @method getScopesForUser
     * @param {String|Object} user User ID or an actual user object.
     * @param {Array|String} [roles] Name of roles to restrict scopes to.
     *
     * @return {Array} Array of user's scopes, unsorted.
     * @static
     */
    getScopesForUser: function (user, roles) {
      var scopes;
      var id;
      if (roles && !Array.isArray(roles)) roles = [roles];

      if (user && typeof user === 'object') {
        id = user._id;
      } else {
        id = user;
      }

      if (!id) return [];
      const selector = {
        'user._id': id,
        scope: {
          $ne: null
        }
      };

      if (roles) {
        selector['inheritedRoles._id'] = {
          $in: roles
        };
      }

      scopes = Meteor.roleAssignment.find(selector, {
        fields: {
          scope: 1
        }
      }).fetch().map(obi => obi.scope);
      return [...new Set(scopes)];
    },

    /**
     * Rename a scope.
     *
     * Roles assigned with a given scope are changed to be under the new scope.
     *
     * @method renameScope
     * @param {String} oldName Old name of a scope.
     * @param {String} newName New name of a scope.
     * @static
     */
    renameScope: function (oldName, newName) {
      var count;

      Roles._checkScopeName(oldName);

      Roles._checkScopeName(newName);

      if (oldName === newName) return;

      do {
        count = Meteor.roleAssignment.update({
          scope: oldName
        }, {
          $set: {
            scope: newName
          }
        }, {
          multi: true
        });
      } while (count > 0);
    },

    /**
     * Remove a scope.
     *
     * Roles assigned with a given scope are removed.
     *
     * @method removeScope
     * @param {String} name The name of a scope.
     * @static
     */
    removeScope: function (name) {
      Roles._checkScopeName(name);

      Meteor.roleAssignment.remove({
        scope: name
      });
    },

    /**
     * Throw an exception if `roleName` is an invalid role name.
     *
     * @method _checkRoleName
     * @param {String} roleName A role name to match against.
     * @private
     * @static
     */
    _checkRoleName: function (roleName) {
      if (!roleName || typeof roleName !== 'string' || roleName.trim() !== roleName) {
        throw new Error('Invalid role name \'' + roleName + '\'.');
      }
    },

    /**
     * Find out if a role is an ancestor of another role.
     *
     * WARNING: If you check this on the client, please make sure all roles are published.
     *
     * @method isParentOf
     * @param {String} parentRoleName The role you want to research.
     * @param {String} childRoleName The role you expect to be among the children of parentRoleName.
     * @static
     */
    isParentOf: function (parentRoleName, childRoleName) {
      if (parentRoleName === childRoleName) {
        return true;
      }

      if (parentRoleName == null || childRoleName == null) {
        return false;
      }

      Roles._checkRoleName(parentRoleName);

      Roles._checkRoleName(childRoleName);

      var rolesToCheck = [parentRoleName];

      while (rolesToCheck.length !== 0) {
        var roleName = rolesToCheck.pop();

        if (roleName === childRoleName) {
          return true;
        }

        var role = Meteor.roles.findOne({
          _id: roleName
        }); // This should not happen, but this is a problem to address at some other time.

        if (!role) continue;
        rolesToCheck = rolesToCheck.concat(role.children.map(r => r._id));
      }

      return false;
    },

    /**
     * Normalize options.
     *
     * @method _normalizeOptions
     * @param {Object} options Options to normalize.
     * @return {Object} Normalized options.
     * @private
     * @static
     */
    _normalizeOptions: function (options) {
      options = options === undefined ? {} : options;

      if (options === null || typeof options === 'string') {
        options = {
          scope: options
        };
      }

      options.scope = Roles._normalizeScopeName(options.scope);
      return options;
    },

    /**
     * Normalize scope name.
     *
     * @method _normalizeScopeName
     * @param {String} scopeName A scope name to normalize.
     * @return {String} Normalized scope name.
     * @private
     * @static
     */
    _normalizeScopeName: function (scopeName) {
      // map undefined and null to null
      if (scopeName == null) {
        return null;
      } else {
        return scopeName;
      }
    },

    /**
     * Throw an exception if `scopeName` is an invalid scope name.
     *
     * @method _checkRoleName
     * @param {String} scopeName A scope name to match against.
     * @private
     * @static
     */
    _checkScopeName: function (scopeName) {
      if (scopeName === null) return;

      if (!scopeName || typeof scopeName !== 'string' || scopeName.trim() !== scopeName) {
        throw new Error('Invalid scope name \'' + scopeName + '\'.');
      }
    }
  });
}.call(this, module);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"roles_server.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/alanning_roles/roles/roles_server.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global Meteor, Roles */
Meteor.roleAssignment._ensureIndex({
  'user._id': 1,
  'inheritedRoles._id': 1,
  scope: 1
});

Meteor.roleAssignment._ensureIndex({
  'user._id': 1,
  'role._id': 1,
  scope: 1
});

Meteor.roleAssignment._ensureIndex({
  'role._id': 1
});

Meteor.roleAssignment._ensureIndex({
  scope: 1,
  'user._id': 1,
  'inheritedRoles._id': 1
}); // Adding userId and roleId might speed up other queries depending on the first index


Meteor.roleAssignment._ensureIndex({
  'inheritedRoles._id': 1
});

Meteor.roles._ensureIndex({
  'children._id': 1
});
/*
 * Publish logged-in user's roles so client-side checks can work.
 *
 * Use a named publish function so clients can check `ready()` state.
 */


Meteor.publish('_roles', function () {
  var loggedInUserId = this.userId;
  var fields = {
    roles: 1
  };

  if (!loggedInUserId) {
    this.ready();
    return;
  }

  return Meteor.users.find({
    _id: loggedInUserId
  }, {
    fields: fields
  });
});
Object.assign(Roles, {
  /**
   * @method _isNewRole
   * @param {Object} role `Meteor.roles` document.
   * @return {Boolean} Returns `true` if the `role` is in the new format.
   *                   If it is ambiguous or it is not, returns `false`.
   * @for Roles
   * @private
   * @static
   */
  _isNewRole: function (role) {
    return !('name' in role) && 'children' in role;
  },

  /**
   * @method _isOldRole
   * @param {Object} role `Meteor.roles` document.
   * @return {Boolean} Returns `true` if the `role` is in the old format.
   *                   If it is ambiguous or it is not, returns `false`.
   * @for Roles
   * @private
   * @static
   */
  _isOldRole: function (role) {
    return 'name' in role && !('children' in role);
  },

  /**
   * @method _isNewField
   * @param {Array} roles `Meteor.users` document `roles` field.
   * @return {Boolean} Returns `true` if the `roles` field is in the new format.
   *                   If it is ambiguous or it is not, returns `false`.
   * @for Roles
   * @private
   * @static
   */
  _isNewField: function (roles) {
    return Array.isArray(roles) && typeof roles[0] === 'object';
  },

  /**
   * @method _isOldField
   * @param {Array} roles `Meteor.users` document `roles` field.
   * @return {Boolean} Returns `true` if the `roles` field is in the old format.
   *                   If it is ambiguous or it is not, returns `false`.
   * @for Roles
   * @private
   * @static
   */
  _isOldField: function (roles) {
    return Array.isArray(roles) && typeof roles[0] === 'string' || typeof roles === 'object' && !Array.isArray(roles);
  },

  /**
   * @method _convertToNewRole
   * @param {Object} oldRole `Meteor.roles` document.
   * @return {Object} Converted `role` to the new format.
   * @for Roles
   * @private
   * @static
   */
  _convertToNewRole: function (oldRole) {
    if (!(typeof oldRole.name === 'string')) throw new Error("Role name '" + oldRole.name + "' is not a string.");
    return {
      _id: oldRole.name,
      children: []
    };
  },

  /**
   * @method _convertToOldRole
   * @param {Object} newRole `Meteor.roles` document.
   * @return {Object} Converted `role` to the old format.
   * @for Roles
   * @private
   * @static
   */
  _convertToOldRole: function (newRole) {
    if (!(typeof newRole._id === 'string')) throw new Error("Role name '" + newRole._id + "' is not a string.");
    return {
      name: newRole._id
    };
  },

  /**
   * @method _convertToNewField
   * @param {Array} oldRoles `Meteor.users` document `roles` field in the old format.
   * @param {Boolean} convertUnderscoresToDots Should we convert underscores to dots in group names.
   * @return {Array} Converted `roles` to the new format.
   * @for Roles
   * @private
   * @static
   */
  _convertToNewField: function (oldRoles, convertUnderscoresToDots) {
    var roles = [];

    if (Array.isArray(oldRoles)) {
      oldRoles.forEach(function (role, index) {
        if (!(typeof role === 'string')) throw new Error("Role '" + role + "' is not a string.");
        roles.push({
          _id: role,
          scope: null,
          assigned: true
        });
      });
    } else if (typeof oldRoles === 'object') {
      Object.entries(oldRoles).forEach((_ref) => {
        let [group, rolesArray] = _ref;

        if (group === '__global_roles__') {
          group = null;
        } else if (convertUnderscoresToDots) {
          // unescape
          group = group.replace(/_/g, '.');
        }

        rolesArray.forEach(function (role) {
          if (!(typeof role === 'string')) throw new Error("Role '" + role + "' is not a string.");
          roles.push({
            _id: role,
            scope: group,
            assigned: true
          });
        });
      });
    }

    return roles;
  },

  /**
   * @method _convertToOldField
   * @param {Array} newRoles `Meteor.users` document `roles` field in the new format.
   * @param {Boolean} usingGroups Should we use groups or not.
   * @return {Array} Converted `roles` to the old format.
   * @for Roles
   * @private
   * @static
   */
  _convertToOldField: function (newRoles, usingGroups) {
    var roles;

    if (usingGroups) {
      roles = {};
    } else {
      roles = [];
    }

    newRoles.forEach(function (userRole) {
      if (!(typeof userRole === 'object')) throw new Error("Role '" + userRole + "' is not an object."); // We assume that we are converting back a failed migration, so values can only be
      // what were valid values in 1.0. So no group names starting with $ and no subroles.

      if (userRole.scope) {
        if (!usingGroups) throw new Error("Role '" + userRole._id + "' with scope '" + userRole.scope + "' without enabled groups."); // escape

        var scope = userRole.scope.replace(/\./g, '_');
        if (scope[0] === '$') throw new Error("Group name '" + scope + "' start with $.");
        roles[scope] = roles[scope] || [];
        roles[scope].push(userRole._id);
      } else {
        if (usingGroups) {
          roles.__global_roles__ = roles.__global_roles__ || [];

          roles.__global_roles__.push(userRole._id);
        } else {
          roles.push(userRole._id);
        }
      }
    });
    return roles;
  },

  /**
   * @method _defaultUpdateUser
   * @param {Object} user `Meteor.users` document.
   * @param {Array|Object} roles Value to which user's `roles` field should be set.
   * @for Roles
   * @private
   * @static
   */
  _defaultUpdateUser: function (user, roles) {
    Meteor.users.update({
      _id: user._id,
      // making sure nothing changed in meantime
      roles: user.roles
    }, {
      $set: {
        roles
      }
    });
  },

  /**
   * @method _defaultUpdateRole
   * @param {Object} oldRole Old `Meteor.roles` document.
   * @param {Object} newRole New `Meteor.roles` document.
   * @for Roles
   * @private
   * @static
   */
  _defaultUpdateRole: function (oldRole, newRole) {
    Meteor.roles.remove(oldRole._id);
    Meteor.roles.insert(newRole);
  },

  /**
   * @method _dropCollectionIndex
   * @param {Object} collection Collection on which to drop the index.
   * @param {String} indexName Name of the index to drop.
   * @for Roles
   * @private
   * @static
   */
  _dropCollectionIndex: function (collection, indexName) {
    try {
      collection._dropIndex(indexName);
    } catch (e) {
      if (e.name !== 'MongoError') throw e;
      if (!/index not found/.test(e.err || e.errmsg)) throw e;
    }
  },

  /**
   * Migrates `Meteor.users` and `Meteor.roles` to the new format.
   *
   * @method _forwardMigrate
   * @param {Function} updateUser Function which updates the user object. Default `_defaultUpdateUser`.
   * @param {Function} updateRole Function which updates the role object. Default `_defaultUpdateRole`.
   * @param {Boolean} convertUnderscoresToDots Should we convert underscores to dots in group names.
   * @for Roles
   * @private
   * @static
   */
  _forwardMigrate: function (updateUser, updateRole, convertUnderscoresToDots) {
    updateUser = updateUser || Roles._defaultUpdateUser;
    updateRole = updateRole || Roles._defaultUpdateRole;

    Roles._dropCollectionIndex(Meteor.roles, 'name_1');

    Meteor.roles.find().forEach(function (role, index, cursor) {
      if (!Roles._isNewRole(role)) {
        updateRole(role, Roles._convertToNewRole(role));
      }
    });
    Meteor.users.find().forEach(function (user, index, cursor) {
      if (!Roles._isNewField(user.roles)) {
        updateUser(user, Roles._convertToNewField(user.roles, convertUnderscoresToDots));
      }
    });
  },

  /**
   * Moves the assignments from `Meteor.users` to `Meteor.roleAssignment`.
   *
   * @method _forwardMigrate2
   * @param {Object} userSelector An opportunity to share the work among instances. It's advisable to do the division based on user-id.
   * @for Roles
   * @private
   * @static
   */
  _forwardMigrate2: function (userSelector) {
    userSelector = userSelector || {};
    Object.assign(userSelector, {
      roles: {
        $ne: null
      }
    });
    Meteor.users.find(userSelector).forEach(function (user, index) {
      user.roles.filter(r => r.assigned).forEach(r => {
        // Added `ifExists` to make it less error-prone
        Roles._addUserToRole(user._id, r._id, {
          scope: r.scope,
          ifExists: true
        });
      });
      Meteor.users.update({
        _id: user._id
      }, {
        $unset: {
          roles: ''
        }
      });
    }); // No need to keep the indexes around

    Roles._dropCollectionIndex(Meteor.users, 'roles._id_1_roles.scope_1');

    Roles._dropCollectionIndex(Meteor.users, 'roles.scope_1');
  },

  /**
   * Migrates `Meteor.users` and `Meteor.roles` to the old format.
   *
   * We assume that we are converting back a failed migration, so values can only be
   * what were valid values in the old format. So no group names starting with `$` and
   * no subroles.
   *
   * @method _backwardMigrate
   * @param {Function} updateUser Function which updates the user object. Default `_defaultUpdateUser`.
   * @param {Function} updateRole Function which updates the role object. Default `_defaultUpdateRole`.
   * @param {Boolean} usingGroups Should we use groups or not.
   * @for Roles
   * @private
   * @static
   */
  _backwardMigrate: function (updateUser, updateRole, usingGroups) {
    updateUser = updateUser || Roles._defaultUpdateUser;
    updateRole = updateRole || Roles._defaultUpdateRole;

    Roles._dropCollectionIndex(Meteor.users, 'roles._id_1_roles.scope_1');

    Roles._dropCollectionIndex(Meteor.users, 'roles.scope_1');

    Meteor.roles.find().forEach(function (role, index, cursor) {
      if (!Roles._isOldRole(role)) {
        updateRole(role, Roles._convertToOldRole(role));
      }
    });
    Meteor.users.find().forEach(function (user, index, cursor) {
      if (!Roles._isOldField(user.roles)) {
        updateUser(user, Roles._convertToOldField(user.roles, usingGroups));
      }
    });
  },

  /**
   * Moves the assignments from `Meteor.roleAssignment` back to to `Meteor.users`.
   *
   * @method _backwardMigrate2
   * @param {Object} assignmentSelector An opportunity to share the work among instances. It's advisable to do the division based on user-id.
   * @for Roles
   * @private
   * @static
   */
  _backwardMigrate2: function (assignmentSelector) {
    assignmentSelector = assignmentSelector || {};

    Meteor.users._ensureIndex({
      'roles._id': 1,
      'roles.scope': 1
    });

    Meteor.users._ensureIndex({
      'roles.scope': 1
    });

    Meteor.roleAssignment.find(assignmentSelector).forEach(r => {
      const roles = Meteor.users.findOne({
        _id: r.user._id
      }).roles || [];
      const currentRole = roles.find(oldRole => oldRole._id === r.role._id && oldRole.scope === r.scope);

      if (currentRole) {
        currentRole.assigned = true;
      } else {
        roles.push({
          _id: r.role._id,
          scope: r.scope,
          assigned: true
        });
        r.inheritedRoles.forEach(inheritedRole => {
          const currentInheritedRole = roles.find(oldRole => oldRole._id === inheritedRole._id && oldRole.scope === r.scope);

          if (!currentInheritedRole) {
            roles.push({
              _id: inheritedRole._id,
              scope: r.scope,
              assigned: false
            });
          }
        });
      }

      Meteor.users.update({
        _id: r.user._id
      }, {
        $set: {
          roles
        }
      });
      Meteor.roleAssignment.remove({
        _id: r._id
      });
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/alanning:roles/roles/roles_common.js");
require("/node_modules/meteor/alanning:roles/roles/roles_server.js");

/* Exports */
Package._define("alanning:roles", {
  Roles: Roles
});

})();

//# sourceURL=meteor://💻app/packages/alanning_roles.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYWxhbm5pbmc6cm9sZXMvcm9sZXMvcm9sZXNfY29tbW9uLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9hbGFubmluZzpyb2xlcy9yb2xlcy9yb2xlc19zZXJ2ZXIuanMiXSwibmFtZXMiOlsiTWV0ZW9yIiwicm9sZXMiLCJNb25nbyIsIkNvbGxlY3Rpb24iLCJyb2xlQXNzaWdubWVudCIsIlJvbGVzIiwiZ2V0R3JvdXBzRm9yVXNlckRlcHJlY2F0aW9uV2FybmluZyIsIk9iamVjdCIsImFzc2lnbiIsIkdMT0JBTF9HUk9VUCIsImNyZWF0ZVJvbGUiLCJyb2xlTmFtZSIsIm9wdGlvbnMiLCJfY2hlY2tSb2xlTmFtZSIsInVubGVzc0V4aXN0cyIsInJlc3VsdCIsInVwc2VydCIsIl9pZCIsIiRzZXRPbkluc2VydCIsImNoaWxkcmVuIiwiaW5zZXJ0ZWRJZCIsIkVycm9yIiwiZGVsZXRlUm9sZSIsImluaGVyaXRlZFJvbGVzIiwicmVtb3ZlIiwiX2dldFBhcmVudFJvbGVOYW1lcyIsImZpbmRPbmUiLCJmaW5kIiwiJGluIiwiZmV0Y2giLCJmb3JFYWNoIiwiciIsInVwZGF0ZSIsIiRwdWxsIiwiX2dldEluaGVyaXRlZFJvbGVOYW1lcyIsIiRzZXQiLCJtYXAiLCJyMiIsIm11bHRpIiwibGVuZ3RoIiwicmVuYW1lUm9sZSIsIm9sZE5hbWUiLCJuZXdOYW1lIiwicm9sZSIsImNvdW50IiwiaW5zZXJ0IiwiYWRkUm9sZXNUb1BhcmVudCIsInJvbGVzTmFtZXMiLCJwYXJlbnROYW1lIiwiQXJyYXkiLCJpc0FycmF5IiwiX2FkZFJvbGVUb1BhcmVudCIsImluY2x1ZGVzIiwiJG5lIiwiJHB1c2giLCIkZWFjaCIsInJlbW92ZVJvbGVzRnJvbVBhcmVudCIsIl9yZW1vdmVSb2xlRnJvbVBhcmVudCIsImZpZWxkcyIsImFkZFVzZXJzVG9Sb2xlcyIsInVzZXJzIiwiaWQiLCJfbm9ybWFsaXplT3B0aW9ucyIsIl9jaGVja1Njb3BlTmFtZSIsInNjb3BlIiwiaWZFeGlzdHMiLCJ1c2VyIiwiX2FkZFVzZXJUb1JvbGUiLCJzZXRVc2VyUm9sZXMiLCJhbnlTY29wZSIsInNlbGVjdG9yIiwidXNlcklkIiwicmVzIiwicGFyZW50Um9sZXMiLCJTZXQiLCJwYXJlbnRSb2xlIiwiYWRkIiwiZGVsZXRlIiwibmVzdGVkUm9sZXMiLCJyZW1vdmVVc2Vyc0Zyb21Sb2xlcyIsIl9yZW1vdmVVc2VyRnJvbVJvbGUiLCJ1c2VySXNJblJvbGUiLCJmaWx0ZXIiLCJzb21lIiwibGltaXQiLCJnZXRSb2xlc0ZvclVzZXIiLCJmdWxsT2JqZWN0cyIsIm9ubHlBc3NpZ25lZCIsIm9ubHlTY29wZWQiLCJwdXNoIiwicmVkdWNlIiwicmV2IiwiY3VycmVudCIsImNvbmNhdCIsImdldEFsbFJvbGVzIiwicXVlcnlPcHRpb25zIiwic29ydCIsImdldFVzZXJzSW5Sb2xlIiwiaWRzIiwiZ2V0VXNlckFzc2lnbm1lbnRzRm9yUm9sZSIsImEiLCJfZ2V0VXNlcnNJblJvbGVDdXJzb3IiLCJnZXRHcm91cHNGb3JVc2VyIiwiY29uc29sZSIsIndhcm4iLCJnZXRTY29wZXNGb3JVc2VyIiwic2NvcGVzIiwib2JpIiwicmVuYW1lU2NvcGUiLCJyZW1vdmVTY29wZSIsIm5hbWUiLCJ0cmltIiwiaXNQYXJlbnRPZiIsInBhcmVudFJvbGVOYW1lIiwiY2hpbGRSb2xlTmFtZSIsInJvbGVzVG9DaGVjayIsInBvcCIsInVuZGVmaW5lZCIsIl9ub3JtYWxpemVTY29wZU5hbWUiLCJzY29wZU5hbWUiLCJfZW5zdXJlSW5kZXgiLCJwdWJsaXNoIiwibG9nZ2VkSW5Vc2VySWQiLCJyZWFkeSIsIl9pc05ld1JvbGUiLCJfaXNPbGRSb2xlIiwiX2lzTmV3RmllbGQiLCJfaXNPbGRGaWVsZCIsIl9jb252ZXJ0VG9OZXdSb2xlIiwib2xkUm9sZSIsIl9jb252ZXJ0VG9PbGRSb2xlIiwibmV3Um9sZSIsIl9jb252ZXJ0VG9OZXdGaWVsZCIsIm9sZFJvbGVzIiwiY29udmVydFVuZGVyc2NvcmVzVG9Eb3RzIiwiaW5kZXgiLCJhc3NpZ25lZCIsImVudHJpZXMiLCJncm91cCIsInJvbGVzQXJyYXkiLCJyZXBsYWNlIiwiX2NvbnZlcnRUb09sZEZpZWxkIiwibmV3Um9sZXMiLCJ1c2luZ0dyb3VwcyIsInVzZXJSb2xlIiwiX19nbG9iYWxfcm9sZXNfXyIsIl9kZWZhdWx0VXBkYXRlVXNlciIsIl9kZWZhdWx0VXBkYXRlUm9sZSIsIl9kcm9wQ29sbGVjdGlvbkluZGV4IiwiY29sbGVjdGlvbiIsImluZGV4TmFtZSIsIl9kcm9wSW5kZXgiLCJlIiwidGVzdCIsImVyciIsImVycm1zZyIsIl9mb3J3YXJkTWlncmF0ZSIsInVwZGF0ZVVzZXIiLCJ1cGRhdGVSb2xlIiwiY3Vyc29yIiwiX2ZvcndhcmRNaWdyYXRlMiIsInVzZXJTZWxlY3RvciIsIiR1bnNldCIsIl9iYWNrd2FyZE1pZ3JhdGUiLCJfYmFja3dhcmRNaWdyYXRlMiIsImFzc2lnbm1lbnRTZWxlY3RvciIsImN1cnJlbnRSb2xlIiwiaW5oZXJpdGVkUm9sZSIsImN1cnJlbnRJbmhlcml0ZWRSb2xlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsTUFBSSxDQUFDQSxNQUFNLENBQUNDLEtBQVosRUFBbUI7QUFDakJELFVBQU0sQ0FBQ0MsS0FBUCxHQUFlLElBQUlDLEtBQUssQ0FBQ0MsVUFBVixDQUFxQixPQUFyQixDQUFmO0FBQ0Q7O0FBRUQsTUFBSSxDQUFDSCxNQUFNLENBQUNJLGNBQVosRUFBNEI7QUFDMUJKLFVBQU0sQ0FBQ0ksY0FBUCxHQUF3QixJQUFJRixLQUFLLENBQUNDLFVBQVYsQ0FBcUIsaUJBQXJCLENBQXhCO0FBQ0Q7QUFFRDs7Ozs7QUFHQSxNQUFJLE9BQU9FLEtBQVAsS0FBaUIsV0FBckIsRUFBa0M7QUFDaENBLFNBQUssR0FBRyxFQUFSLENBRGdDLENBQ3JCO0FBQ1o7O0FBRUQsTUFBSUMsa0NBQWtD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YUFBYSxJQUFJO0FBQ3hDLGdCQUFNQyxvQkFBb0IsR0FBR3ZLLEtBQUssQ0FBQzBCLElBQU4sQ0FBV3NHLE9BQU8sSUFBSUEsT0FBTyxDQUFDaEgsR0FBUixLQUFnQnNKLGFBQWEsQ0FBQ3RKLEdBQTlCLElBQXFDZ0gsT0FBTyxDQUFDakUsS0FBUixLQUFrQmpDLENBQUMsQ0FBQ2lDLEtBQS9FLENBQTdCOztBQUVBLGNBQUksQ0FBQ3dHLG9CQUFMLEVBQTJCO0FBQ3pCdkssaUJBQUssQ0FBQ3dGLElBQU4sQ0FBVztBQUNUeEUsaUJBQUcsRUFBRXNKLGFBQWEsQ0FBQ3RKLEdBRFY7QUFFVCtDLG1CQUFLLEVBQUVqQyxDQUFDLENBQUNpQyxLQUZBO0FBR1R3RSxzQkFBUSxFQUFFO0FBSEQsYUFBWDtBQUtEO0FBQ0YsU0FWRDtBQVdEOztBQUVEeEksWUFBTSxDQUFDNEQsS0FBUCxDQUFhNUIsTUFBYixDQUFvQjtBQUFFZixXQUFHLEVBQUVjLENBQUMsQ0FBQ21DLElBQUYsQ0FBT2pEO0FBQWQsT0FBcEIsRUFBeUM7QUFBRWtCLFlBQUksRUFBRTtBQUFFbEM7QUFBRjtBQUFSLE9BQXpDO0FBQ0FELFlBQU0sQ0FBQ0ksY0FBUCxDQUFzQm9CLE1BQXRCLENBQTZCO0FBQUVQLFdBQUcsRUFBRWMsQ0FBQyxDQUFDZDtBQUFULE9BQTdCO0FBQ0QsS0E1QkQ7QUE2QkQ7QUF4V2tCLENBQXJCLEUiLCJmaWxlIjoiL3BhY2thZ2VzL2FsYW5uaW5nX3JvbGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIE1ldGVvciwgUm9sZXMsIE1vbmdvICovXG5cbi8qKlxuICogUHJvdmlkZXMgZnVuY3Rpb25zIHJlbGF0ZWQgdG8gdXNlciBhdXRob3JpemF0aW9uLiBDb21wYXRpYmxlIHdpdGggYnVpbHQtaW4gTWV0ZW9yIGFjY291bnRzIHBhY2thZ2VzLlxuICpcbiAqIFJvbGVzIGFyZSBhY2Nlc3NpYmxlIHRocm9naCBgTWV0ZW9yLnJvbGVzYCBjb2xsZWN0aW9uIGFuZCBkb2N1bWVudHMgY29uc2lzdCBvZjpcbiAqICAtIGBfaWRgOiByb2xlIG5hbWVcbiAqICAtIGBjaGlsZHJlbmA6IGxpc3Qgb2Ygc3ViZG9jdW1lbnRzOlxuICogICAgLSBgX2lkYFxuICpcbiAqIENoaWxkcmVuIGxpc3QgZWxlbWVudHMgYXJlIHN1YmRvY3VtZW50cyBzbyB0aGF0IHRoZXkgY2FuIGJlIGVhc2llciBleHRlbmRlZCBpbiB0aGUgZnV0dXJlIG9yIGJ5IHBsdWdpbnMuXG4gKlxuICogUm9sZXMgY2FuIGhhdmUgbXVsdGlwbGUgcGFyZW50cyBhbmQgY2FuIGJlIGNoaWxkcmVuIChzdWJyb2xlcykgb2YgbXVsdGlwbGUgcm9sZXMuXG4gKlxuICogRXhhbXBsZTogYHtfaWQ6ICdhZG1pbicsIGNoaWxkcmVuOiBbe19pZDogJ2VkaXRvcid9XX1gXG4gKlxuICogVGhlIGFzc2lnbm1lbnQgb2YgYSByb2xlIHRvIGEgdXNlciBpcyBzdG9yZWQgaW4gYSBjb2xsZWN0aW9uLCBhY2Nlc3NpYmxlIHRocm91Z2ggYE1ldGVvci5yb2xlQXNzaWdubWVudGAuXG4gKiBJdCdzIGRvY3VtZW50cyBjb25zaXN0IG9mXG4gKiAgLSBgX2lkYDogSW50ZXJuYWwgTW9uZ29EQiBpZFxuICogIC0gYHJvbGVgOiBBIHJvbGUgb2JqZWN0IHdoaWNoIGdvdCBhc3NpZ25lZC4gVXN1YWxseSBvbmx5IGNvbnRhaW5zIHRoZSBgX2lkYCBwcm9wZXJ0eVxuICogIC0gYHVzZXJgOiBBIHVzZXIgb2JqZWN0LCB1c3VhbGx5IG9ubHkgY29udGFpbnMgdGhlIGBfaWRgIHByb3BlcnR5XG4gKiAgLSBgc2NvcGVgOiBzY29wZSBuYW1lXG4gKiAgLSBgaW5oZXJpdGVkUm9sZXNgOiBBIGxpc3Qgb2YgYWxsIHRoZSByb2xlcyBvYmplY3RzIGluaGVyaXRlZCBieSB0aGUgYXNzaWduZWQgcm9sZS5cbiAqXG4gKiBAbW9kdWxlIFJvbGVzXG4gKi9cbmlmICghTWV0ZW9yLnJvbGVzKSB7XG4gIE1ldGVvci5yb2xlcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdyb2xlcycpXG59XG5cbmlmICghTWV0ZW9yLnJvbGVBc3NpZ25tZW50KSB7XG4gIE1ldGVvci5yb2xlQXNzaWdubWVudCA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdyb2xlLWFzc2lnbm1lbnQnKVxufVxuXG4vKipcbiAqIEBjbGFzcyBSb2xlc1xuICovXG5pZiAodHlwZW9mIFJvbGVzID09PSAndW5kZWZpbmVkJykge1xuICBSb2xlcyA9IHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZ2xvYmFsLWFzc2lnblxufVxuXG52YXIgZ2V0R3JvdXBzRm9yVXNlckRlcHJlY2F0aW9uV2FybmluZyA9IGZhbHNlXG5cbk9iamVjdC5hc3NpZ24oUm9sZXMsIHtcblxuICAvKipcbiAgICogVXNlZCBhcyBhIGdsb2JhbCBncm91cCAobm93IHNjb3BlKSBuYW1lLiBOb3QgdXNlZCBhbnltb3JlLlxuICAgKlxuICAgKiBAcHJvcGVydHkgR0xPQkFMX0dST1VQXG4gICAqIEBzdGF0aWNcbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIEdMT0JBTF9HUk9VUDogbnVsbCxcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHJvbGUuXG4gICAqXG4gICAqIEBtZXRob2QgY3JlYXRlUm9sZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcm9sZU5hbWUgTmFtZSBvZiByb2xlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIE9wdGlvbnM6XG4gICAqICAgLSBgdW5sZXNzRXhpc3RzYDogaWYgYHRydWVgLCBleGNlcHRpb24gd2lsbCBub3QgYmUgdGhyb3duIGluIHRoZSByb2xlIGFscmVhZHkgZXhpc3RzXG4gICAqIEByZXR1cm4ge1N0cmluZ30gSUQgb2YgdGhlIG5ldyByb2xlIG9yIG51bGwuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIGNyZWF0ZVJvbGU6IGZ1bmN0aW9uIChyb2xlTmFtZSwgb3B0aW9ucykge1xuICAgIFJvbGVzLl9jaGVja1JvbGVOYW1lKHJvbGVOYW1lKVxuXG4gICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgdW5sZXNzRXhpc3RzOiBmYWxzZVxuICAgIH0sIG9wdGlvbnMpXG5cbiAgICB2YXIgcmVzdWx0ID0gTWV0ZW9yLnJvbGVzLnVwc2VydCh7IF9pZDogcm9sZU5hbWUgfSwgeyAkc2V0T25JbnNlcnQ6IHsgY2hpbGRyZW46IFtdIH0gfSlcblxuICAgIGlmICghcmVzdWx0Lmluc2VydGVkSWQpIHtcbiAgICAgIGlmIChvcHRpb25zLnVubGVzc0V4aXN0cykgcmV0dXJuIG51bGxcbiAgICAgIHRocm93IG5ldyBFcnJvcignUm9sZSBcXCcnICsgcm9sZU5hbWUgKyAnXFwnIGFscmVhZHkgZXhpc3RzLicpXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdC5pbnNlcnRlZElkXG4gIH0sXG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbiBleGlzdGluZyByb2xlLlxuICAgKlxuICAgKiBJZiB0aGUgcm9sZSBpcyBzZXQgZm9yIGFueSB1c2VyLCBpdCBpcyBhdXRvbWF0aWNhbGx5IHVuc2V0LlxuICAgKlxuICAgKiBAbWV0aG9kIGRlbGV0ZVJvbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHJvbGVOYW1lIE5hbWUgb2Ygcm9sZS5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgZGVsZXRlUm9sZTogZnVuY3Rpb24gKHJvbGVOYW1lKSB7XG4gICAgdmFyIHJvbGVzXG4gICAgdmFyIGluaGVyaXRlZFJvbGVzXG5cbiAgICBSb2xlcy5fY2hlY2tSb2xlTmFtZShyb2xlTmFtZSlcblxuICAgIC8vIFJlbW92ZSBhbGwgYXNzaWdubWVudHNcbiAgICBNZXRlb3Iucm9sZUFzc2lnbm1lbnQucmVtb3ZlKHtcbiAgICAgICdyb2xlLl9pZCc6IHJvbGVOYW1lXG4gICAgfSlcblxuICAgIGRvIHtcbiAgICAgIC8vIEZvciBhbGwgcm9sZXMgd2hvIGhhdmUgaXQgYXMgYSBkZXBlbmRlbmN5IC4uLlxuICAgICAgcm9sZXMgPSBSb2xlcy5fZ2V0UGFyZW50Um9sZU5hbWVzKE1ldGVvci5yb2xlcy5maW5kT25lKHsgX2lkOiByb2xlTmFtZSB9KSlcblxuICAgICAgTWV0ZW9yLnJvbGVzLmZpbmQoeyBfaWQ6IHsgJGluOiByb2xlcyB9IH0pLmZldGNoKCkuZm9yRWFjaChyID0+IHtcbiAgICAgICAgTWV0ZW9yLnJvbGVzLnVwZGF0ZSh7XG4gICAgICAgICAgX2lkOiByLl9pZFxuICAgICAgICB9LCB7XG4gICAgICAgICAgJHB1bGw6IHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiB7XG4gICAgICAgICAgICAgIF9pZDogcm9sZU5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaW5oZXJpdGVkUm9sZXMgPSBSb2xlcy5fZ2V0SW5oZXJpdGVkUm9sZU5hbWVzKE1ldGVvci5yb2xlcy5maW5kT25lKHsgX2lkOiByLl9pZCB9KSlcbiAgICAgICAgTWV0ZW9yLnJvbGVBc3NpZ25tZW50LnVwZGF0ZSh7XG4gICAgICAgICAgJ3JvbGUuX2lkJzogci5faWRcbiAgICAgICAgfSwge1xuICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgIGluaGVyaXRlZFJvbGVzOiBbci5faWQsIC4uLmluaGVyaXRlZFJvbGVzXS5tYXAocjIgPT4gKHsgX2lkOiByMiB9KSlcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHsgbXVsdGk6IHRydWUgfSlcbiAgICAgIH0pXG4gICAgfSB3aGlsZSAocm9sZXMubGVuZ3RoID4gMClcblxuICAgIC8vIEFuZCBmaW5hbGx5IHJlbW92ZSB0aGUgcm9sZSBpdHNlbGZcbiAgICBNZXRlb3Iucm9sZXMucmVtb3ZlKHsgX2lkOiByb2xlTmFtZSB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiBSZW5hbWUgYW4gZXhpc3Rpbmcgcm9sZS5cbiAgICpcbiAgICogQG1ldGhvZCByZW5hbWVSb2xlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvbGROYW1lIE9sZCBuYW1lIG9mIGEgcm9sZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5ld05hbWUgTmV3IG5hbWUgb2YgYSByb2xlLlxuICAgKiBAc3RhdGljXG4gICAqL1xuICByZW5hbWVSb2xlOiBmdW5jdGlvbiAob2xkTmFtZSwgbmV3TmFtZSkge1xuICAgIHZhciByb2xlXG4gICAgdmFyIGNvdW50XG5cbiAgICBSb2xlcy5fY2hlY2tSb2xlTmFtZShvbGROYW1lKVxuICAgIFJvbGVzLl9jaGVja1JvbGVOYW1lKG5ld05hbWUpXG5cbiAgICBpZiAob2xkTmFtZSA9PT0gbmV3TmFtZSkgcmV0dXJuXG5cbiAgICByb2xlID0gTWV0ZW9yLnJvbGVzLmZpbmRPbmUoeyBfaWQ6IG9sZE5hbWUgfSlcblxuICAgIGlmICghcm9sZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSb2xlIFxcJycgKyBvbGROYW1lICsgJ1xcJyBkb2VzIG5vdCBleGlzdC4nKVxuICAgIH1cblxuICAgIHJvbGUuX2lkID0gbmV3TmFtZVxuXG4gICAgTWV0ZW9yLnJvbGVzLmluc2VydChyb2xlKVxuXG4gICAgZG8ge1xuICAgICAgY291bnQgPSBNZXRlb3Iucm9sZUFzc2lnbm1lbnQudXBkYXRlKHtcbiAgICAgICAgJ3JvbGUuX2lkJzogb2xkTmFtZVxuICAgICAgfSwge1xuICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgJ3JvbGUuX2lkJzogbmV3TmFtZVxuICAgICAgICB9XG4gICAgICB9LCB7IG11bHRpOiB0cnVlIH0pXG4gICAgfSB3aGlsZSAoY291bnQgPiAwKVxuXG4gICAgZG8ge1xuICAgICAgY291bnQgPSBNZXRlb3Iucm9sZUFzc2lnbm1lbnQudXBkYXRlKHtcbiAgICAgICAgJ2luaGVyaXRlZFJvbGVzLl9pZCc6IG9sZE5hbWVcbiAgICAgIH0sIHtcbiAgICAgICAgJHNldDoge1xuICAgICAgICAgICdpbmhlcml0ZWRSb2xlcy4kLl9pZCc6IG5ld05hbWVcbiAgICAgICAgfVxuICAgICAgfSwgeyBtdWx0aTogdHJ1ZSB9KVxuICAgIH0gd2hpbGUgKGNvdW50ID4gMClcblxuICAgIGRvIHtcbiAgICAgIGNvdW50ID0gTWV0ZW9yLnJvbGVzLnVwZGF0ZSh7XG4gICAgICAgICdjaGlsZHJlbi5faWQnOiBvbGROYW1lXG4gICAgICB9LCB7XG4gICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAnY2hpbGRyZW4uJC5faWQnOiBuZXdOYW1lXG4gICAgICAgIH1cbiAgICAgIH0sIHsgbXVsdGk6IHRydWUgfSlcbiAgICB9IHdoaWxlIChjb3VudCA+IDApXG5cbiAgICBNZXRlb3Iucm9sZXMucmVtb3ZlKHsgX2lkOiBvbGROYW1lIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIEFkZCByb2xlIHBhcmVudCB0byByb2xlcy5cbiAgICpcbiAgICogUHJldmlvdXMgcGFyZW50cyBhcmUga2VwdCAocm9sZSBjYW4gaGF2ZSBtdWx0aXBsZSBwYXJlbnRzKS4gRm9yIHVzZXJzIHdoaWNoIGhhdmUgdGhlXG4gICAqIHBhcmVudCByb2xlIHNldCwgbmV3IHN1YnJvbGVzIGFyZSBhZGRlZCBhdXRvbWF0aWNhbGx5LlxuICAgKlxuICAgKiBAbWV0aG9kIGFkZFJvbGVzVG9QYXJlbnRcbiAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IHJvbGVzTmFtZXMgTmFtZShzKSBvZiByb2xlKHMpLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGFyZW50TmFtZSBOYW1lIG9mIHBhcmVudCByb2xlLlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBhZGRSb2xlc1RvUGFyZW50OiBmdW5jdGlvbiAocm9sZXNOYW1lcywgcGFyZW50TmFtZSkge1xuICAgIC8vIGVuc3VyZSBhcnJheXNcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocm9sZXNOYW1lcykpIHJvbGVzTmFtZXMgPSBbcm9sZXNOYW1lc11cblxuICAgIHJvbGVzTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAocm9sZU5hbWUpIHtcbiAgICAgIFJvbGVzLl9hZGRSb2xlVG9QYXJlbnQocm9sZU5hbWUsIHBhcmVudE5hbWUpXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICogQG1ldGhvZCBfYWRkUm9sZVRvUGFyZW50XG4gICAqIEBwYXJhbSB7U3RyaW5nfSByb2xlTmFtZSBOYW1lIG9mIHJvbGUuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJlbnROYW1lIE5hbWUgb2YgcGFyZW50IHJvbGUuXG4gICAqIEBwcml2YXRlXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIF9hZGRSb2xlVG9QYXJlbnQ6IGZ1bmN0aW9uIChyb2xlTmFtZSwgcGFyZW50TmFtZSkge1xuICAgIHZhciByb2xlXG4gICAgdmFyIGNvdW50XG5cbiAgICBSb2xlcy5fY2hlY2tSb2xlTmFtZShyb2xlTmFtZSlcbiAgICBSb2xlcy5fY2hlY2tSb2xlTmFtZShwYXJlbnROYW1lKVxuXG4gICAgLy8gcXVlcnkgdG8gZ2V0IHJvbGUncyBjaGlsZHJlblxuICAgIHJvbGUgPSBNZXRlb3Iucm9sZXMuZmluZE9uZSh7IF9pZDogcm9sZU5hbWUgfSlcblxuICAgIGlmICghcm9sZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSb2xlIFxcJycgKyByb2xlTmFtZSArICdcXCcgZG9lcyBub3QgZXhpc3QuJylcbiAgICB9XG5cbiAgICAvLyBkZXRlY3QgY3ljbGVzXG4gICAgaWYgKFJvbGVzLl9nZXRJbmhlcml0ZWRSb2xlTmFtZXMocm9sZSkuaW5jbHVkZXMocGFyZW50TmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUm9sZXMgXFwnJyArIHJvbGVOYW1lICsgJ1xcJyBhbmQgXFwnJyArIHBhcmVudE5hbWUgKyAnXFwnIHdvdWxkIGZvcm0gYSBjeWNsZS4nKVxuICAgIH1cblxuICAgIGNvdW50ID0gTWV0ZW9yLnJvbGVzLnVwZGF0ZSh7XG4gICAgICBfaWQ6IHBhcmVudE5hbWUsXG4gICAgICAnY2hpbGRyZW4uX2lkJzoge1xuICAgICAgICAkbmU6IHJvbGUuX2lkXG4gICAgICB9XG4gICAgfSwge1xuICAgICAgJHB1c2g6IHtcbiAgICAgICAgY2hpbGRyZW46IHtcbiAgICAgICAgICBfaWQ6IHJvbGUuX2lkXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gaWYgdGhlcmUgd2FzIG5vIGNoYW5nZSwgcGFyZW50IHJvbGUgbWlnaHQgbm90IGV4aXN0LCBvciByb2xlIGlzXG4gICAgLy8gYWxyZWFkeSBhIHN1YnJvbGU7IGluIGFueSBjYXNlIHdlIGRvIG5vdCBoYXZlIGFueXRoaW5nIG1vcmUgdG8gZG9cbiAgICBpZiAoIWNvdW50KSByZXR1cm5cblxuICAgIE1ldGVvci5yb2xlQXNzaWdubWVudC51cGRhdGUoe1xuICAgICAgJ2luaGVyaXRlZFJvbGVzLl9pZCc6IHBhcmVudE5hbWVcbiAgICB9LCB7XG4gICAgICAkcHVzaDoge1xuICAgICAgICBpbmhlcml0ZWRSb2xlczogeyAkZWFjaDogW3JvbGUuX2lkLCAuLi5Sb2xlcy5fZ2V0SW5oZXJpdGVkUm9sZU5hbWVzKHJvbGUpXS5tYXAociA9PiAoeyBfaWQ6IHIgfSkpIH1cbiAgICAgIH1cbiAgICB9LCB7IG11bHRpOiB0cnVlIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbW92ZSByb2xlIHBhcmVudCBmcm9tIHJvbGVzLlxuICAgKlxuICAgKiBPdGhlciBwYXJlbnRzIGFyZSBrZXB0IChyb2xlIGNhbiBoYXZlIG11bHRpcGxlIHBhcmVudHMpLiBGb3IgdXNlcnMgd2hpY2ggaGF2ZSB0aGVcbiAgICogcGFyZW50IHJvbGUgc2V0LCByZW1vdmVkIHN1YnJvbGUgaXMgcmVtb3ZlZCBhdXRvbWF0aWNhbGx5LlxuICAgKlxuICAgKiBAbWV0aG9kIHJlbW92ZVJvbGVzRnJvbVBhcmVudFxuICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gcm9sZXNOYW1lcyBOYW1lKHMpIG9mIHJvbGUocykuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJlbnROYW1lIE5hbWUgb2YgcGFyZW50IHJvbGUuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHJlbW92ZVJvbGVzRnJvbVBhcmVudDogZnVuY3Rpb24gKHJvbGVzTmFtZXMsIHBhcmVudE5hbWUpIHtcbiAgICAvLyBlbnN1cmUgYXJyYXlzXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHJvbGVzTmFtZXMpKSByb2xlc05hbWVzID0gW3JvbGVzTmFtZXNdXG5cbiAgICByb2xlc05hbWVzLmZvckVhY2goZnVuY3Rpb24gKHJvbGVOYW1lKSB7XG4gICAgICBSb2xlcy5fcmVtb3ZlUm9sZUZyb21QYXJlbnQocm9sZU5hbWUsIHBhcmVudE5hbWUpXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICogQG1ldGhvZCBfcmVtb3ZlUm9sZUZyb21QYXJlbnRcbiAgICogQHBhcmFtIHtTdHJpbmd9IHJvbGVOYW1lIE5hbWUgb2Ygcm9sZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhcmVudE5hbWUgTmFtZSBvZiBwYXJlbnQgcm9sZS5cbiAgICogQHByaXZhdGVcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgX3JlbW92ZVJvbGVGcm9tUGFyZW50OiBmdW5jdGlvbiAocm9sZU5hbWUsIHBhcmVudE5hbWUpIHtcbiAgICBSb2xlcy5fY2hlY2tSb2xlTmFtZShyb2xlTmFtZSlcbiAgICBSb2xlcy5fY2hlY2tSb2xlTmFtZShwYXJlbnROYW1lKVxuXG4gICAgLy8gY2hlY2sgZm9yIHJvbGUgZXhpc3RlbmNlXG4gICAgLy8gdGhpcyB3b3VsZCBub3QgcmVhbGx5IGJlIG5lZWRlZCwgYnV0IHdlIGFyZSB0cnlpbmcgdG8gbWF0Y2ggYWRkUm9sZXNUb1BhcmVudFxuICAgIGxldCByb2xlID0gTWV0ZW9yLnJvbGVzLmZpbmRPbmUoeyBfaWQ6IHJvbGVOYW1lIH0sIHsgZmllbGRzOiB7IF9pZDogMSB9IH0pXG5cbiAgICBpZiAoIXJvbGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUm9sZSBcXCcnICsgcm9sZU5hbWUgKyAnXFwnIGRvZXMgbm90IGV4aXN0LicpXG4gICAgfVxuXG4gICAgY29uc3QgY291bnQgPSBNZXRlb3Iucm9sZXMudXBkYXRlKHtcbiAgICAgIF9pZDogcGFyZW50TmFtZVxuICAgIH0sIHtcbiAgICAgICRwdWxsOiB7XG4gICAgICAgIGNoaWxkcmVuOiB7XG4gICAgICAgICAgX2lkOiByb2xlLl9pZFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIGlmIHRoZXJlIHdhcyBubyBjaGFuZ2UsIHBhcmVudCByb2xlIG1pZ2h0IG5vdCBleGlzdCwgb3Igcm9sZSB3YXNcbiAgICAvLyBhbHJlYWR5IG5vdCBhIHN1YnJvbGU7IGluIGFueSBjYXNlIHdlIGRvIG5vdCBoYXZlIGFueXRoaW5nIG1vcmUgdG8gZG9cbiAgICBpZiAoIWNvdW50KSByZXR1cm5cblxuICAgIC8vIEZvciBhbGwgcm9sZXMgd2hvIGhhdmUgaGFkIGl0IGFzIGEgZGVwZW5kZW5jeSAuLi5cbiAgICBjb25zdCByb2xlcyA9IFsuLi5Sb2xlcy5fZ2V0UGFyZW50Um9sZU5hbWVzKE1ldGVvci5yb2xlcy5maW5kT25lKHsgX2lkOiBwYXJlbnROYW1lIH0pKSwgcGFyZW50TmFtZV1cblxuICAgIE1ldGVvci5yb2xlcy5maW5kKHsgX2lkOiB7ICRpbjogcm9sZXMgfSB9KS5mZXRjaCgpLmZvckVhY2gociA9PiB7XG4gICAgICBjb25zdCBpbmhlcml0ZWRSb2xlcyA9IFJvbGVzLl9nZXRJbmhlcml0ZWRSb2xlTmFtZXMoTWV0ZW9yLnJvbGVzLmZpbmRPbmUoeyBfaWQ6IHIuX2lkIH0pKVxuICAgICAgTWV0ZW9yLnJvbGVBc3NpZ25tZW50LnVwZGF0ZSh7XG4gICAgICAgICdyb2xlLl9pZCc6IHIuX2lkLFxuICAgICAgICAnaW5oZXJpdGVkUm9sZXMuX2lkJzogcm9sZS5faWRcbiAgICAgIH0sIHtcbiAgICAgICAgJHNldDoge1xuICAgICAgICAgIGluaGVyaXRlZFJvbGVzOiBbci5faWQsIC4uLmluaGVyaXRlZFJvbGVzXS5tYXAocjIgPT4gKHsgX2lkOiByMiB9KSlcbiAgICAgICAgfVxuICAgICAgfSwgeyBtdWx0aTogdHJ1ZSB9KVxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIEFkZCB1c2VycyB0byByb2xlcy5cbiAgICpcbiAgICogQWRkcyByb2xlcyB0byBleGlzdGluZyByb2xlcyBmb3IgZWFjaCB1c2VyLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAgICAgUm9sZXMuYWRkVXNlcnNUb1JvbGVzKHVzZXJJZCwgJ2FkbWluJylcbiAgICogICAgIFJvbGVzLmFkZFVzZXJzVG9Sb2xlcyh1c2VySWQsIFsndmlldy1zZWNyZXRzJ10sICdleGFtcGxlLmNvbScpXG4gICAqICAgICBSb2xlcy5hZGRVc2Vyc1RvUm9sZXMoW3VzZXIxLCB1c2VyMl0sIFsndXNlcicsJ2VkaXRvciddKVxuICAgKiAgICAgUm9sZXMuYWRkVXNlcnNUb1JvbGVzKFt1c2VyMSwgdXNlcjJdLCBbJ2dsb3Jpb3VzLWFkbWluJywgJ3BlcmZvcm0tYWN0aW9uJ10sICdleGFtcGxlLm9yZycpXG4gICAqXG4gICAqIEBtZXRob2QgYWRkVXNlcnNUb1JvbGVzXG4gICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSB1c2VycyBVc2VyIElEKHMpIG9yIG9iamVjdChzKSB3aXRoIGFuIGBfaWRgIGZpZWxkLlxuICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gcm9sZXMgTmFtZShzKSBvZiByb2xlcyB0byBhZGQgdXNlcnMgdG8uIFJvbGVzIGhhdmUgdG8gZXhpc3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gW29wdGlvbnNdIE9wdGlvbnM6XG4gICAqICAgLSBgc2NvcGVgOiBuYW1lIG9mIHRoZSBzY29wZSwgb3IgYG51bGxgIGZvciB0aGUgZ2xvYmFsIHJvbGVcbiAgICogICAtIGBpZkV4aXN0c2A6IGlmIGB0cnVlYCwgZG8gbm90IHRocm93IGFuIGV4Y2VwdGlvbiBpZiB0aGUgcm9sZSBkb2VzIG5vdCBleGlzdFxuICAgKlxuICAgKiBBbHRlcm5hdGl2ZWx5LCBpdCBjYW4gYmUgYSBzY29wZSBuYW1lIHN0cmluZy5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgYWRkVXNlcnNUb1JvbGVzOiBmdW5jdGlvbiAodXNlcnMsIHJvbGVzLCBvcHRpb25zKSB7XG4gICAgdmFyIGlkXG5cbiAgICBpZiAoIXVzZXJzKSB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgXFwndXNlcnNcXCcgcGFyYW0uJylcbiAgICBpZiAoIXJvbGVzKSB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgXFwncm9sZXNcXCcgcGFyYW0uJylcblxuICAgIG9wdGlvbnMgPSBSb2xlcy5fbm9ybWFsaXplT3B0aW9ucyhvcHRpb25zKVxuXG4gICAgLy8gZW5zdXJlIGFycmF5c1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh1c2VycykpIHVzZXJzID0gW3VzZXJzXVxuICAgIGlmICghQXJyYXkuaXNBcnJheShyb2xlcykpIHJvbGVzID0gW3JvbGVzXVxuXG4gICAgUm9sZXMuX2NoZWNrU2NvcGVOYW1lKG9wdGlvbnMuc2NvcGUpXG5cbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBpZkV4aXN0czogZmFsc2VcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdXNlcnMuZm9yRWFjaChmdW5jdGlvbiAodXNlcikge1xuICAgICAgaWYgKHR5cGVvZiB1c2VyID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZCA9IHVzZXIuX2lkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZCA9IHVzZXJcbiAgICAgIH1cblxuICAgICAgcm9sZXMuZm9yRWFjaChmdW5jdGlvbiAocm9sZSkge1xuICAgICAgICBSb2xlcy5fYWRkVXNlclRvUm9sZShpZCwgcm9sZSwgb3B0aW9ucylcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICogU2V0IHVzZXJzJyByb2xlcy5cbiAgICpcbiAgICogUmVwbGFjZXMgYWxsIGV4aXN0aW5nIHJvbGVzIHdpdGggYSBuZXcgc2V0IG9mIHJvbGVzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAgICAgUm9sZXMuc2V0VXNlclJvbGVzKHVzZXJJZCwgJ2FkbWluJylcbiAgICogICAgIFJvbGVzLnNldFVzZXJSb2xlcyh1c2VySWQsIFsndmlldy1zZWNyZXRzJ10sICdleGFtcGxlLmNvbScpXG4gICAqICAgICBSb2xlcy5zZXRVc2VyUm9sZXMoW3VzZXIxLCB1c2VyMl0sIFsndXNlcicsJ2VkaXRvciddKVxuICAgKiAgICAgUm9sZXMuc2V0VXNlclJvbGVzKFt1c2VyMSwgdXNlcjJdLCBbJ2dsb3Jpb3VzLWFkbWluJywgJ3BlcmZvcm0tYWN0aW9uJ10sICdleGFtcGxlLm9yZycpXG4gICAqXG4gICAqIEBtZXRob2Qgc2V0VXNlclJvbGVzXG4gICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSB1c2VycyBVc2VyIElEKHMpIG9yIG9iamVjdChzKSB3aXRoIGFuIGBfaWRgIGZpZWxkLlxuICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gcm9sZXMgTmFtZShzKSBvZiByb2xlcyB0byBhZGQgdXNlcnMgdG8uIFJvbGVzIGhhdmUgdG8gZXhpc3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gW29wdGlvbnNdIE9wdGlvbnM6XG4gICAqICAgLSBgc2NvcGVgOiBuYW1lIG9mIHRoZSBzY29wZSwgb3IgYG51bGxgIGZvciB0aGUgZ2xvYmFsIHJvbGVcbiAgICogICAtIGBhbnlTY29wZWA6IGlmIGB0cnVlYCwgcmVtb3ZlIGFsbCByb2xlcyB0aGUgdXNlciBoYXMsIG9mIGFueSBzY29wZSwgaWYgYGZhbHNlYCwgb25seSB0aGUgb25lIGluIHRoZSBzYW1lIHNjb3BlXG4gICAqICAgLSBgaWZFeGlzdHNgOiBpZiBgdHJ1ZWAsIGRvIG5vdCB0aHJvdyBhbiBleGNlcHRpb24gaWYgdGhlIHJvbGUgZG9lcyBub3QgZXhpc3RcbiAgICpcbiAgICogQWx0ZXJuYXRpdmVseSwgaXQgY2FuIGJlIGEgc2NvcGUgbmFtZSBzdHJpbmcuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHNldFVzZXJSb2xlczogZnVuY3Rpb24gKHVzZXJzLCByb2xlcywgb3B0aW9ucykge1xuICAgIHZhciBpZFxuXG4gICAgaWYgKCF1c2VycykgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIFxcJ3VzZXJzXFwnIHBhcmFtLicpXG4gICAgaWYgKCFyb2xlcykgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIFxcJ3JvbGVzXFwnIHBhcmFtLicpXG5cbiAgICBvcHRpb25zID0gUm9sZXMuX25vcm1hbGl6ZU9wdGlvbnMob3B0aW9ucylcblxuICAgIC8vIGVuc3VyZSBhcnJheXNcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodXNlcnMpKSB1c2VycyA9IFt1c2Vyc11cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocm9sZXMpKSByb2xlcyA9IFtyb2xlc11cblxuICAgIFJvbGVzLl9jaGVja1Njb3BlTmFtZShvcHRpb25zLnNjb3BlKVxuXG4gICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgaWZFeGlzdHM6IGZhbHNlLFxuICAgICAgYW55U2NvcGU6IGZhbHNlXG4gICAgfSwgb3B0aW9ucylcblxuICAgIHVzZXJzLmZvckVhY2goZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgdXNlciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWQgPSB1c2VyLl9pZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWQgPSB1c2VyXG4gICAgICB9XG4gICAgICAvLyB3ZSBmaXJzdCBjbGVhciBhbGwgcm9sZXMgZm9yIHRoZSB1c2VyXG4gICAgICBjb25zdCBzZWxlY3RvciA9IHsgJ3VzZXIuX2lkJzogaWQgfVxuICAgICAgaWYgKCFvcHRpb25zLmFueVNjb3BlKSB7XG4gICAgICAgIHNlbGVjdG9yLnNjb3BlID0gb3B0aW9ucy5zY29wZVxuICAgICAgfVxuXG4gICAgICBNZXRlb3Iucm9sZUFzc2lnbm1lbnQucmVtb3ZlKHNlbGVjdG9yKVxuXG4gICAgICAvLyBhbmQgdGhlbiBhZGQgYWxsXG4gICAgICByb2xlcy5mb3JFYWNoKGZ1bmN0aW9uIChyb2xlKSB7XG4gICAgICAgIFJvbGVzLl9hZGRVc2VyVG9Sb2xlKGlkLCByb2xlLCBvcHRpb25zKVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiBBZGQgb25lIHVzZXIgdG8gb25lIHJvbGUuXG4gICAqXG4gICAqIEBtZXRob2QgX2FkZFVzZXJUb1JvbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHVzZXJJZCBUaGUgdXNlciBJRC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHJvbGVOYW1lIE5hbWUgb2YgdGhlIHJvbGUgdG8gYWRkIHRoZSB1c2VyIHRvLiBUaGUgcm9sZSBoYXZlIHRvIGV4aXN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zOlxuICAgKiAgIC0gYHNjb3BlYDogbmFtZSBvZiB0aGUgc2NvcGUsIG9yIGBudWxsYCBmb3IgdGhlIGdsb2JhbCByb2xlXG4gICAqICAgLSBgaWZFeGlzdHNgOiBpZiBgdHJ1ZWAsIGRvIG5vdCB0aHJvdyBhbiBleGNlcHRpb24gaWYgdGhlIHJvbGUgZG9lcyBub3QgZXhpc3RcbiAgICogQHByaXZhdGVcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgX2FkZFVzZXJUb1JvbGU6IGZ1bmN0aW9uICh1c2VySWQsIHJvbGVOYW1lLCBvcHRpb25zKSB7XG4gICAgUm9sZXMuX2NoZWNrUm9sZU5hbWUocm9sZU5hbWUpXG4gICAgUm9sZXMuX2NoZWNrU2NvcGVOYW1lKG9wdGlvbnMuc2NvcGUpXG5cbiAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgcm9sZSA9IE1ldGVvci5yb2xlcy5maW5kT25lKHsgX2lkOiByb2xlTmFtZSB9LCB7IGZpZWxkczogeyBjaGlsZHJlbjogMSB9IH0pXG5cbiAgICBpZiAoIXJvbGUpIHtcbiAgICAgIGlmIChvcHRpb25zLmlmRXhpc3RzKSB7XG4gICAgICAgIHJldHVybiBbXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSb2xlIFxcJycgKyByb2xlTmFtZSArICdcXCcgZG9lcyBub3QgZXhpc3QuJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUaGlzIG1pZ2h0IGNyZWF0ZSBkdXBsaWNhdGVzLCBiZWNhdXNlIHdlIGRvbid0IGhhdmUgYSB1bmlxdWUgaW5kZXgsIGJ1dCB0aGF0J3MgYWxsIHJpZ2h0LiBJbiBjYXNlIHRoZXJlIGFyZSB0d28sIHdpdGhkcmF3aW5nIHRoZSByb2xlIHdpbGwgZWZmZWN0aXZlbHkga2lsbCB0aGVtIGJvdGguXG4gICAgY29uc3QgcmVzID0gTWV0ZW9yLnJvbGVBc3NpZ25tZW50LnVwc2VydCh7XG4gICAgICAndXNlci5faWQnOiB1c2VySWQsXG4gICAgICAncm9sZS5faWQnOiByb2xlTmFtZSxcbiAgICAgIHNjb3BlOiBvcHRpb25zLnNjb3BlXG4gICAgfSwge1xuICAgICAgJHNldE9uSW5zZXJ0OiB7XG4gICAgICAgIHVzZXI6IHsgX2lkOiB1c2VySWQgfSxcbiAgICAgICAgcm9sZTogeyBfaWQ6IHJvbGVOYW1lIH0sXG4gICAgICAgIHNjb3BlOiBvcHRpb25zLnNjb3BlXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmIChyZXMuaW5zZXJ0ZWRJZCkge1xuICAgICAgTWV0ZW9yLnJvbGVBc3NpZ25tZW50LnVwZGF0ZSh7IF9pZDogcmVzLmluc2VydGVkSWQgfSwge1xuICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgaW5oZXJpdGVkUm9sZXM6IFtyb2xlTmFtZSwgLi4uUm9sZXMuX2dldEluaGVyaXRlZFJvbGVOYW1lcyhyb2xlKV0ubWFwKHIgPT4gKHsgX2lkOiByIH0pKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiByZXNcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSBvZiByb2xlIG5hbWVzIHRoZSBnaXZlbiByb2xlIG5hbWUgaXMgYSBjaGlsZCBvZi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogICAgIFJvbGVzLl9nZXRQYXJlbnRSb2xlTmFtZXMoeyBfaWQ6ICdhZG1pbicsIGNoaWxkcmVuOyBbXSB9KVxuICAgKlxuICAgKiBAbWV0aG9kIF9nZXRQYXJlbnRSb2xlTmFtZXNcbiAgICogQHBhcmFtIHtvYmplY3R9IHJvbGUgVGhlIHJvbGUgb2JqZWN0XG4gICAqIEBwcml2YXRlXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIF9nZXRQYXJlbnRSb2xlTmFtZXM6IGZ1bmN0aW9uIChyb2xlKSB7XG4gICAgdmFyIHBhcmVudFJvbGVzXG5cbiAgICBpZiAoIXJvbGUpIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cblxuICAgIHBhcmVudFJvbGVzID0gbmV3IFNldChbcm9sZS5faWRdKVxuXG4gICAgcGFyZW50Um9sZXMuZm9yRWFjaChyb2xlTmFtZSA9PiB7XG4gICAgICBNZXRlb3Iucm9sZXMuZmluZCh7ICdjaGlsZHJlbi5faWQnOiByb2xlTmFtZSB9KS5mZXRjaCgpLmZvckVhY2gocGFyZW50Um9sZSA9PiB7XG4gICAgICAgIHBhcmVudFJvbGVzLmFkZChwYXJlbnRSb2xlLl9pZClcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHBhcmVudFJvbGVzLmRlbGV0ZShyb2xlLl9pZClcblxuICAgIHJldHVybiBbLi4ucGFyZW50Um9sZXNdXG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2Ygcm9sZSBuYW1lcyB0aGUgZ2l2ZW4gcm9sZSBuYW1lIGlzIGEgcGFyZW50IG9mLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAgICAgUm9sZXMuX2dldEluaGVyaXRlZFJvbGVOYW1lcyh7IF9pZDogJ2FkbWluJywgY2hpbGRyZW47IFtdIH0pXG4gICAqXG4gICAqIEBtZXRob2QgX2dldEluaGVyaXRlZFJvbGVOYW1lc1xuICAgKiBAcGFyYW0ge29iamVjdH0gcm9sZSBUaGUgcm9sZSBvYmplY3RcbiAgICogQHByaXZhdGVcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgX2dldEluaGVyaXRlZFJvbGVOYW1lczogZnVuY3Rpb24gKHJvbGUpIHtcbiAgICBjb25zdCBpbmhlcml0ZWRSb2xlcyA9IG5ldyBTZXQoKVxuICAgIGNvbnN0IG5lc3RlZFJvbGVzID0gbmV3IFNldChbcm9sZV0pXG5cbiAgICBuZXN0ZWRSb2xlcy5mb3JFYWNoKHIgPT4ge1xuICAgICAgY29uc3Qgcm9sZXMgPSBNZXRlb3Iucm9sZXMuZmluZCh7IF9pZDogeyAkaW46IHIuY2hpbGRyZW4ubWFwKHIgPT4gci5faWQpIH0gfSwgeyBmaWVsZHM6IHsgY2hpbGRyZW46IDEgfSB9KS5mZXRjaCgpXG5cbiAgICAgIHJvbGVzLmZvckVhY2gocjIgPT4ge1xuICAgICAgICBpbmhlcml0ZWRSb2xlcy5hZGQocjIuX2lkKVxuICAgICAgICBuZXN0ZWRSb2xlcy5hZGQocjIpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICByZXR1cm4gWy4uLmluaGVyaXRlZFJvbGVzXVxuICB9LFxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdXNlcnMgZnJvbSBhc3NpZ25lZCByb2xlcy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogICAgIFJvbGVzLnJlbW92ZVVzZXJzRnJvbVJvbGVzKHVzZXJJZCwgJ2FkbWluJylcbiAgICogICAgIFJvbGVzLnJlbW92ZVVzZXJzRnJvbVJvbGVzKFt1c2VySWQsIHVzZXIyXSwgWydlZGl0b3InXSlcbiAgICogICAgIFJvbGVzLnJlbW92ZVVzZXJzRnJvbVJvbGVzKHVzZXJJZCwgWyd1c2VyJ10sICdncm91cDEnKVxuICAgKlxuICAgKiBAbWV0aG9kIHJlbW92ZVVzZXJzRnJvbVJvbGVzXG4gICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSB1c2VycyBVc2VyIElEKHMpIG9yIG9iamVjdChzKSB3aXRoIGFuIGBfaWRgIGZpZWxkLlxuICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gcm9sZXMgTmFtZShzKSBvZiByb2xlcyB0byBhZGQgdXNlcnMgdG8uIFJvbGVzIGhhdmUgdG8gZXhpc3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gW29wdGlvbnNdIE9wdGlvbnM6XG4gICAqICAgLSBgc2NvcGVgOiBuYW1lIG9mIHRoZSBzY29wZSwgb3IgYG51bGxgIGZvciB0aGUgZ2xvYmFsIHJvbGVcbiAgICogICAtIGBhbnlTY29wZWA6IGlmIHNldCwgcm9sZSBjYW4gYmUgaW4gYW55IHNjb3BlIChgc2NvcGVgIG9wdGlvbiBpcyBpZ25vcmVkKVxuICAgKlxuICAgKiBBbHRlcm5hdGl2ZWx5LCBpdCBjYW4gYmUgYSBzY29wZSBuYW1lIHN0cmluZy5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgcmVtb3ZlVXNlcnNGcm9tUm9sZXM6IGZ1bmN0aW9uICh1c2Vycywgcm9sZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAoIXVzZXJzKSB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgXFwndXNlcnNcXCcgcGFyYW0uJylcbiAgICBpZiAoIXJvbGVzKSB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgXFwncm9sZXNcXCcgcGFyYW0uJylcblxuICAgIG9wdGlvbnMgPSBSb2xlcy5fbm9ybWFsaXplT3B0aW9ucyhvcHRpb25zKVxuXG4gICAgLy8gZW5zdXJlIGFycmF5c1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh1c2VycykpIHVzZXJzID0gW3VzZXJzXVxuICAgIGlmICghQXJyYXkuaXNBcnJheShyb2xlcykpIHJvbGVzID0gW3JvbGVzXVxuXG4gICAgUm9sZXMuX2NoZWNrU2NvcGVOYW1lKG9wdGlvbnMuc2NvcGUpXG5cbiAgICB1c2Vycy5mb3JFYWNoKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICBpZiAoIXVzZXIpIHJldHVyblxuXG4gICAgICByb2xlcy5mb3JFYWNoKGZ1bmN0aW9uIChyb2xlKSB7XG4gICAgICAgIGxldCBpZFxuICAgICAgICBpZiAodHlwZW9mIHVzZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgaWQgPSB1c2VyLl9pZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlkID0gdXNlclxuICAgICAgICB9XG5cbiAgICAgICAgUm9sZXMuX3JlbW92ZVVzZXJGcm9tUm9sZShpZCwgcm9sZSwgb3B0aW9ucylcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlIG9uZSB1c2VyIGZyb20gb25lIHJvbGUuXG4gICAqXG4gICAqIEBtZXRob2QgX3JlbW92ZVVzZXJGcm9tUm9sZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXNlcklkIFRoZSB1c2VyIElELlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcm9sZU5hbWUgTmFtZSBvZiB0aGUgcm9sZSB0byBhZGQgdGhlIHVzZXIgdG8uIFRoZSByb2xlIGhhdmUgdG8gZXhpc3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIE9wdGlvbnM6XG4gICAqICAgLSBgc2NvcGVgOiBuYW1lIG9mIHRoZSBzY29wZSwgb3IgYG51bGxgIGZvciB0aGUgZ2xvYmFsIHJvbGVcbiAgICogICAtIGBhbnlTY29wZWA6IGlmIHNldCwgcm9sZSBjYW4gYmUgaW4gYW55IHNjb3BlIChgc2NvcGVgIG9wdGlvbiBpcyBpZ25vcmVkKVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAc3RhdGljXG4gICAqL1xuICBfcmVtb3ZlVXNlckZyb21Sb2xlOiBmdW5jdGlvbiAodXNlcklkLCByb2xlTmFtZSwgb3B0aW9ucykge1xuICAgIFJvbGVzLl9jaGVja1JvbGVOYW1lKHJvbGVOYW1lKVxuICAgIFJvbGVzLl9jaGVja1Njb3BlTmFtZShvcHRpb25zLnNjb3BlKVxuXG4gICAgaWYgKCF1c2VySWQpIHJldHVyblxuXG4gICAgY29uc3Qgc2VsZWN0b3IgPSB7XG4gICAgICAndXNlci5faWQnOiB1c2VySWQsXG4gICAgICAncm9sZS5faWQnOiByb2xlTmFtZVxuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5hbnlTY29wZSkge1xuICAgICAgc2VsZWN0b3Iuc2NvcGUgPSBvcHRpb25zLnNjb3BlXG4gICAgfVxuXG4gICAgTWV0ZW9yLnJvbGVBc3NpZ25tZW50LnJlbW92ZShzZWxlY3RvcilcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdXNlciBoYXMgc3BlY2lmaWVkIHJvbGVzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAgICAgLy8gZ2xvYmFsIHJvbGVzXG4gICAqICAgICBSb2xlcy51c2VySXNJblJvbGUodXNlciwgJ2FkbWluJylcbiAgICogICAgIFJvbGVzLnVzZXJJc0luUm9sZSh1c2VyLCBbJ2FkbWluJywnZWRpdG9yJ10pXG4gICAqICAgICBSb2xlcy51c2VySXNJblJvbGUodXNlcklkLCAnYWRtaW4nKVxuICAgKiAgICAgUm9sZXMudXNlcklzSW5Sb2xlKHVzZXJJZCwgWydhZG1pbicsJ2VkaXRvciddKVxuICAgKlxuICAgKiAgICAgLy8gc2NvcGUgcm9sZXMgKGdsb2JhbCByb2xlcyBhcmUgc3RpbGwgY2hlY2tlZClcbiAgICogICAgIFJvbGVzLnVzZXJJc0luUm9sZSh1c2VyLCAnYWRtaW4nLCAnZ3JvdXAxJylcbiAgICogICAgIFJvbGVzLnVzZXJJc0luUm9sZSh1c2VySWQsIFsnYWRtaW4nLCdlZGl0b3InXSwgJ2dyb3VwMScpXG4gICAqICAgICBSb2xlcy51c2VySXNJblJvbGUodXNlcklkLCBbJ2FkbWluJywnZWRpdG9yJ10sIHtzY29wZTogJ2dyb3VwMSd9KVxuICAgKlxuICAgKiBAbWV0aG9kIHVzZXJJc0luUm9sZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVzZXIgVXNlciBJRCBvciBhbiBhY3R1YWwgdXNlciBvYmplY3QuXG4gICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSByb2xlcyBOYW1lIG9mIHJvbGUgb3IgYW4gYXJyYXkgb2Ygcm9sZXMgdG8gY2hlY2sgYWdhaW5zdC4gSWYgYXJyYXksXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWxsIHJldHVybiBgdHJ1ZWAgaWYgdXNlciBpcyBpbiBfYW55XyByb2xlLlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUm9sZXMgZG8gbm90IGhhdmUgdG8gZXhpc3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gW29wdGlvbnNdIE9wdGlvbnM6XG4gICAqICAgLSBgc2NvcGVgOiBuYW1lIG9mIHRoZSBzY29wZTsgaWYgc3VwcGxpZWQsIGxpbWl0cyBjaGVjayB0byBqdXN0IHRoYXQgc2NvcGVcbiAgICogICAgIHRoZSB1c2VyJ3MgZ2xvYmFsIHJvbGVzIHdpbGwgYWx3YXlzIGJlIGNoZWNrZWQgd2hldGhlciBzY29wZSBpcyBzcGVjaWZpZWQgb3Igbm90XG4gICAqICAgLSBgYW55U2NvcGVgOiBpZiBzZXQsIHJvbGUgY2FuIGJlIGluIGFueSBzY29wZSAoYHNjb3BlYCBvcHRpb24gaXMgaWdub3JlZClcbiAgICpcbiAgICogQWx0ZXJuYXRpdmVseSwgaXQgY2FuIGJlIGEgc2NvcGUgbmFtZSBzdHJpbmcuXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB1c2VyIGlzIGluIF9hbnlfIG9mIHRoZSB0YXJnZXQgcm9sZXNcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgdXNlcklzSW5Sb2xlOiBmdW5jdGlvbiAodXNlciwgcm9sZXMsIG9wdGlvbnMpIHtcbiAgICB2YXIgaWRcbiAgICB2YXIgc2VsZWN0b3JcblxuICAgIG9wdGlvbnMgPSBSb2xlcy5fbm9ybWFsaXplT3B0aW9ucyhvcHRpb25zKVxuXG4gICAgLy8gZW5zdXJlIGFycmF5IHRvIHNpbXBsaWZ5IGNvZGVcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocm9sZXMpKSByb2xlcyA9IFtyb2xlc11cblxuICAgIHJvbGVzID0gcm9sZXMuZmlsdGVyKHIgPT4gciAhPSBudWxsKVxuXG4gICAgaWYgKCFyb2xlcy5sZW5ndGgpIHJldHVybiBmYWxzZVxuXG4gICAgUm9sZXMuX2NoZWNrU2NvcGVOYW1lKG9wdGlvbnMuc2NvcGUpXG5cbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhbnlTY29wZTogZmFsc2VcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgaWYgKHVzZXIgJiYgdHlwZW9mIHVzZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZCA9IHVzZXIuX2lkXG4gICAgfSBlbHNlIHtcbiAgICAgIGlkID0gdXNlclxuICAgIH1cblxuICAgIGlmICghaWQpIHJldHVybiBmYWxzZVxuXG4gICAgc2VsZWN0b3IgPSB7XG4gICAgICAndXNlci5faWQnOiBpZFxuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5hbnlTY29wZSkge1xuICAgICAgc2VsZWN0b3Iuc2NvcGUgPSB7ICRpbjogW29wdGlvbnMuc2NvcGUsIG51bGxdIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcm9sZXMuc29tZSgocm9sZU5hbWUpID0+IHtcbiAgICAgIHNlbGVjdG9yWydpbmhlcml0ZWRSb2xlcy5faWQnXSA9IHJvbGVOYW1lXG5cbiAgICAgIHJldHVybiBNZXRlb3Iucm9sZUFzc2lnbm1lbnQuZmluZChzZWxlY3RvciwgeyBsaW1pdDogMSB9KS5jb3VudCgpID4gMFxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIHVzZXIncyByb2xlcy5cbiAgICpcbiAgICogQG1ldGhvZCBnZXRSb2xlc0ZvclVzZXJcbiAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSB1c2VyIFVzZXIgSUQgb3IgYW4gYWN0dWFsIHVzZXIgb2JqZWN0LlxuICAgKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IFtvcHRpb25zXSBPcHRpb25zOlxuICAgKiAgIC0gYHNjb3BlYDogbmFtZSBvZiBzY29wZSB0byBwcm92aWRlIHJvbGVzIGZvcjsgaWYgbm90IHNwZWNpZmllZCwgZ2xvYmFsIHJvbGVzIGFyZSByZXR1cm5lZFxuICAgKiAgIC0gYGFueVNjb3BlYDogaWYgc2V0LCByb2xlIGNhbiBiZSBpbiBhbnkgc2NvcGUgKGBzY29wZWAgYW5kIGBvbmx5QXNzaWduZWRgIG9wdGlvbnMgYXJlIGlnbm9yZWQpXG4gICAqICAgLSBgb25seVNjb3BlZGA6IGlmIHNldCwgb25seSByb2xlcyBpbiB0aGUgc3BlY2lmaWVkIHNjb3BlIGFyZSByZXR1cm5lZFxuICAgKiAgIC0gYG9ubHlBc3NpZ25lZGA6IHJldHVybiBvbmx5IGFzc2lnbmVkIHJvbGVzIGFuZCBub3QgYXV0b21hdGljYWxseSBpbmZlcnJlZCAobGlrZSBzdWJyb2xlcylcbiAgICogICAtIGBmdWxsT2JqZWN0c2A6IHJldHVybiBmdWxsIHJvbGVzIG9iamVjdHMgKGB0cnVlYCkgb3IganVzdCBuYW1lcyAoYGZhbHNlYCkgKGBvbmx5QXNzaWduZWRgIG9wdGlvbiBpcyBpZ25vcmVkKSAoZGVmYXVsdCBgZmFsc2VgKVxuICAgKiAgICAgSWYgeW91IGhhdmUgYSB1c2UtY2FzZSBmb3IgdGhpcyBvcHRpb24sIHBsZWFzZSBmaWxlIGEgZmVhdHVyZS1yZXF1ZXN0LiBZb3Ugc2hvdWxkbid0IG5lZWQgdG8gdXNlIGl0IGFzIGl0J3NcbiAgICogICAgIHJlc3VsdCBzdHJvbmdseSBkZXBlbmRhbnQgb24gdGhlIGludGVybmFsIGRhdGEgc3RydWN0dXJlIG9mIHRoaXMgcGx1Z2luLlxuICAgKlxuICAgKiBBbHRlcm5hdGl2ZWx5LCBpdCBjYW4gYmUgYSBzY29wZSBuYW1lIHN0cmluZy5cbiAgICogQHJldHVybiB7QXJyYXl9IEFycmF5IG9mIHVzZXIncyByb2xlcywgdW5zb3J0ZWQuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIGdldFJvbGVzRm9yVXNlcjogZnVuY3Rpb24gKHVzZXIsIG9wdGlvbnMpIHtcbiAgICB2YXIgaWRcbiAgICB2YXIgc2VsZWN0b3JcbiAgICB2YXIgZmlsdGVyXG4gICAgdmFyIHJvbGVzXG5cbiAgICBvcHRpb25zID0gUm9sZXMuX25vcm1hbGl6ZU9wdGlvbnMob3B0aW9ucylcblxuICAgIFJvbGVzLl9jaGVja1Njb3BlTmFtZShvcHRpb25zLnNjb3BlKVxuXG4gICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgZnVsbE9iamVjdHM6IGZhbHNlLFxuICAgICAgb25seUFzc2lnbmVkOiBmYWxzZSxcbiAgICAgIGFueVNjb3BlOiBmYWxzZSxcbiAgICAgIG9ubHlTY29wZWQ6IGZhbHNlXG4gICAgfSwgb3B0aW9ucylcblxuICAgIGlmICh1c2VyICYmIHR5cGVvZiB1c2VyID09PSAnb2JqZWN0Jykge1xuICAgICAgaWQgPSB1c2VyLl9pZFxuICAgIH0gZWxzZSB7XG4gICAgICBpZCA9IHVzZXJcbiAgICB9XG5cbiAgICBpZiAoIWlkKSByZXR1cm4gW11cblxuICAgIHNlbGVjdG9yID0ge1xuICAgICAgJ3VzZXIuX2lkJzogaWRcbiAgICB9XG5cbiAgICBmaWx0ZXIgPSB7XG4gICAgICBmaWVsZHM6IHsgJ2luaGVyaXRlZFJvbGVzLl9pZCc6IDEgfVxuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5hbnlTY29wZSkge1xuICAgICAgc2VsZWN0b3Iuc2NvcGUgPSB7ICRpbjogW29wdGlvbnMuc2NvcGVdIH1cblxuICAgICAgaWYgKCFvcHRpb25zLm9ubHlTY29wZWQpIHtcbiAgICAgICAgc2VsZWN0b3Iuc2NvcGUuJGluLnB1c2gobnVsbClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5vbmx5QXNzaWduZWQpIHtcbiAgICAgIGRlbGV0ZSBmaWx0ZXIuZmllbGRzWydpbmhlcml0ZWRSb2xlcy5faWQnXVxuICAgICAgZmlsdGVyLmZpZWxkc1sncm9sZS5faWQnXSA9IDFcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5mdWxsT2JqZWN0cykge1xuICAgICAgZGVsZXRlIGZpbHRlci5maWVsZHNcbiAgICB9XG5cbiAgICByb2xlcyA9IE1ldGVvci5yb2xlQXNzaWdubWVudC5maW5kKHNlbGVjdG9yLCBmaWx0ZXIpLmZldGNoKClcblxuICAgIGlmIChvcHRpb25zLmZ1bGxPYmplY3RzKSB7XG4gICAgICByZXR1cm4gcm9sZXNcbiAgICB9XG5cbiAgICByZXR1cm4gWy4uLm5ldyBTZXQocm9sZXMubWFwKHIgPT4gci5pbmhlcml0ZWRSb2xlcyB8fCBbci5yb2xlXSkucmVkdWNlKChyZXYsIGN1cnJlbnQpID0+IHJldi5jb25jYXQoY3VycmVudCksIFtdKS5tYXAociA9PiByLl9pZCkpXVxuICB9LFxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBjdXJzb3Igb2YgYWxsIGV4aXN0aW5nIHJvbGVzLlxuICAgKlxuICAgKiBAbWV0aG9kIGdldEFsbFJvbGVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcXVlcnlPcHRpb25zXSBPcHRpb25zIHdoaWNoIGFyZSBwYXNzZWQgZGlyZWN0bHlcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm91Z2ggdG8gYE1ldGVvci5yb2xlcy5maW5kKHF1ZXJ5LCBvcHRpb25zKWAuXG4gICAqIEByZXR1cm4ge0N1cnNvcn0gQ3Vyc29yIG9mIGV4aXN0aW5nIHJvbGVzLlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBnZXRBbGxSb2xlczogZnVuY3Rpb24gKHF1ZXJ5T3B0aW9ucykge1xuICAgIHF1ZXJ5T3B0aW9ucyA9IHF1ZXJ5T3B0aW9ucyB8fCB7IHNvcnQ6IHsgX2lkOiAxIH0gfVxuXG4gICAgcmV0dXJuIE1ldGVvci5yb2xlcy5maW5kKHt9LCBxdWVyeU9wdGlvbnMpXG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIGFsbCB1c2VycyB3aG8gYXJlIGluIHRhcmdldCByb2xlLlxuICAgKlxuICAgKiBPcHRpb25zOlxuICAgKlxuICAgKiBAbWV0aG9kIGdldFVzZXJzSW5Sb2xlXG4gICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSByb2xlcyBOYW1lIG9mIHJvbGUgb3IgYW4gYXJyYXkgb2Ygcm9sZXMuIElmIGFycmF5LCB1c2Vyc1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuZWQgd2lsbCBoYXZlIGF0IGxlYXN0IG9uZSBvZiB0aGUgcm9sZXNcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmllZCBidXQgbmVlZCBub3QgaGF2ZSBfYWxsXyByb2xlcy5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJvbGVzIGRvIG5vdCBoYXZlIHRvIGV4aXN0LlxuICAgKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IFtvcHRpb25zXSBPcHRpb25zOlxuICAgKiAgIC0gYHNjb3BlYDogbmFtZSBvZiB0aGUgc2NvcGUgdG8gcmVzdHJpY3Qgcm9sZXMgdG87IHVzZXIncyBnbG9iYWxcbiAgICogICAgIHJvbGVzIHdpbGwgYWxzbyBiZSBjaGVja2VkXG4gICAqICAgLSBgYW55U2NvcGVgOiBpZiBzZXQsIHJvbGUgY2FuIGJlIGluIGFueSBzY29wZSAoYHNjb3BlYCBvcHRpb24gaXMgaWdub3JlZClcbiAgICogICAtIGBvbmx5U2NvcGVkYDogaWYgc2V0LCBvbmx5IHJvbGVzIGluIHRoZSBzcGVjaWZpZWQgc2NvcGUgYXJlIHJldHVybmVkXG4gICAqICAgLSBgcXVlcnlPcHRpb25zYDogb3B0aW9ucyB3aGljaCBhcmUgcGFzc2VkIGRpcmVjdGx5XG4gICAqICAgICB0aHJvdWdoIHRvIGBNZXRlb3IudXNlcnMuZmluZChxdWVyeSwgb3B0aW9ucylgXG4gICAqXG4gICAqIEFsdGVybmF0aXZlbHksIGl0IGNhbiBiZSBhIHNjb3BlIG5hbWUgc3RyaW5nLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3F1ZXJ5T3B0aW9uc10gT3B0aW9ucyB3aGljaCBhcmUgcGFzc2VkIGRpcmVjdGx5XG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdWdoIHRvIGBNZXRlb3IudXNlcnMuZmluZChxdWVyeSwgb3B0aW9ucylgXG4gICAqIEByZXR1cm4ge0N1cnNvcn0gQ3Vyc29yIG9mIHVzZXJzIGluIHJvbGVzLlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBnZXRVc2Vyc0luUm9sZTogZnVuY3Rpb24gKHJvbGVzLCBvcHRpb25zLCBxdWVyeU9wdGlvbnMpIHtcbiAgICB2YXIgaWRzXG5cbiAgICBpZHMgPSBSb2xlcy5nZXRVc2VyQXNzaWdubWVudHNGb3JSb2xlKHJvbGVzLCBvcHRpb25zKS5mZXRjaCgpLm1hcChhID0+IGEudXNlci5faWQpXG5cbiAgICByZXR1cm4gTWV0ZW9yLnVzZXJzLmZpbmQoeyBfaWQ6IHsgJGluOiBpZHMgfSB9LCAoKG9wdGlvbnMgJiYgb3B0aW9ucy5xdWVyeU9wdGlvbnMpIHx8IHF1ZXJ5T3B0aW9ucykgfHwge30pXG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIGFsbCBhc3NpZ25tZW50cyBvZiBhIHVzZXIgd2hpY2ggYXJlIGZvciB0aGUgdGFyZ2V0IHJvbGUuXG4gICAqXG4gICAqIE9wdGlvbnM6XG4gICAqXG4gICAqIEBtZXRob2QgZ2V0VXNlckFzc2lnbm1lbnRzRm9yUm9sZVxuICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gcm9sZXMgTmFtZSBvZiByb2xlIG9yIGFuIGFycmF5IG9mIHJvbGVzLiBJZiBhcnJheSwgdXNlcnNcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybmVkIHdpbGwgaGF2ZSBhdCBsZWFzdCBvbmUgb2YgdGhlIHJvbGVzXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZWQgYnV0IG5lZWQgbm90IGhhdmUgX2FsbF8gcm9sZXMuXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSb2xlcyBkbyBub3QgaGF2ZSB0byBleGlzdC5cbiAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBbb3B0aW9uc10gT3B0aW9uczpcbiAgICogICAtIGBzY29wZWA6IG5hbWUgb2YgdGhlIHNjb3BlIHRvIHJlc3RyaWN0IHJvbGVzIHRvOyB1c2VyJ3MgZ2xvYmFsXG4gICAqICAgICByb2xlcyB3aWxsIGFsc28gYmUgY2hlY2tlZFxuICAgKiAgIC0gYGFueVNjb3BlYDogaWYgc2V0LCByb2xlIGNhbiBiZSBpbiBhbnkgc2NvcGUgKGBzY29wZWAgb3B0aW9uIGlzIGlnbm9yZWQpXG4gICAqICAgLSBgcXVlcnlPcHRpb25zYDogb3B0aW9ucyB3aGljaCBhcmUgcGFzc2VkIGRpcmVjdGx5XG4gICAqICAgICB0aHJvdWdoIHRvIGBNZXRlb3Iucm9sZUFzc2lnbm1lbnQuZmluZChxdWVyeSwgb3B0aW9ucylgXG5cbiAgICogQWx0ZXJuYXRpdmVseSwgaXQgY2FuIGJlIGEgc2NvcGUgbmFtZSBzdHJpbmcuXG4gICAqIEByZXR1cm4ge0N1cnNvcn0gQ3Vyc29yIG9mIHVzZXIgYXNzaWdubWVudHMgZm9yIHJvbGVzLlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBnZXRVc2VyQXNzaWdubWVudHNGb3JSb2xlOiBmdW5jdGlvbiAocm9sZXMsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gUm9sZXMuX25vcm1hbGl6ZU9wdGlvbnMob3B0aW9ucylcblxuICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGFueVNjb3BlOiBmYWxzZSxcbiAgICAgIHF1ZXJ5T3B0aW9uczoge31cbiAgICB9LCBvcHRpb25zKVxuXG4gICAgcmV0dXJuIFJvbGVzLl9nZXRVc2Vyc0luUm9sZUN1cnNvcihyb2xlcywgb3B0aW9ucywgb3B0aW9ucy5xdWVyeU9wdGlvbnMpXG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX2dldFVzZXJzSW5Sb2xlQ3Vyc29yXG4gICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSByb2xlcyBOYW1lIG9mIHJvbGUgb3IgYW4gYXJyYXkgb2Ygcm9sZXMuIElmIGFycmF5LCBpZHMgb2YgdXNlcnMgYXJlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5lZCB3aGljaCBoYXZlIGF0IGxlYXN0IG9uZSBvZiB0aGUgcm9sZXNcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVkIGJ1dCBuZWVkIG5vdCBoYXZlIF9hbGxfIHJvbGVzLlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUm9sZXMgZG8gbm90IGhhdmUgdG8gZXhpc3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gW29wdGlvbnNdIE9wdGlvbnM6XG4gICAqICAgLSBgc2NvcGVgOiBuYW1lIG9mIHRoZSBzY29wZSB0byByZXN0cmljdCByb2xlcyB0bzsgdXNlcidzIGdsb2JhbFxuICAgKiAgICAgcm9sZXMgd2lsbCBhbHNvIGJlIGNoZWNrZWRcbiAgICogICAtIGBhbnlTY29wZWA6IGlmIHNldCwgcm9sZSBjYW4gYmUgaW4gYW55IHNjb3BlIChgc2NvcGVgIG9wdGlvbiBpcyBpZ25vcmVkKVxuICAgKlxuICAgKiBBbHRlcm5hdGl2ZWx5LCBpdCBjYW4gYmUgYSBzY29wZSBuYW1lIHN0cmluZy5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtmaWx0ZXJdIE9wdGlvbnMgd2hpY2ggYXJlIHBhc3NlZCBkaXJlY3RseVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3VnaCB0byBgTWV0ZW9yLnJvbGVBc3NpZ25tZW50LmZpbmQocXVlcnksIG9wdGlvbnMpYFxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnNvciB0byB0aGUgYXNzaWdubWVudCBkb2N1bWVudHNcbiAgICogQHByaXZhdGVcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgX2dldFVzZXJzSW5Sb2xlQ3Vyc29yOiBmdW5jdGlvbiAocm9sZXMsIG9wdGlvbnMsIGZpbHRlcikge1xuICAgIHZhciBzZWxlY3RvclxuXG4gICAgb3B0aW9ucyA9IFJvbGVzLl9ub3JtYWxpemVPcHRpb25zKG9wdGlvbnMpXG5cbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhbnlTY29wZTogZmFsc2UsXG4gICAgICBvbmx5U2NvcGVkOiBmYWxzZVxuICAgIH0sIG9wdGlvbnMpXG5cbiAgICAvLyBlbnN1cmUgYXJyYXkgdG8gc2ltcGxpZnkgY29kZVxuICAgIGlmICghQXJyYXkuaXNBcnJheShyb2xlcykpIHJvbGVzID0gW3JvbGVzXVxuXG4gICAgUm9sZXMuX2NoZWNrU2NvcGVOYW1lKG9wdGlvbnMuc2NvcGUpXG5cbiAgICBmaWx0ZXIgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGZpZWxkczogeyAndXNlci5faWQnOiAxIH1cbiAgICB9LCBmaWx0ZXIpXG5cbiAgICBzZWxlY3RvciA9IHtcbiAgICAgICdpbmhlcml0ZWRSb2xlcy5faWQnOiB7ICRpbjogcm9sZXMgfVxuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5hbnlTY29wZSkge1xuICAgICAgc2VsZWN0b3Iuc2NvcGUgPSB7ICRpbjogW29wdGlvbnMuc2NvcGVdIH1cblxuICAgICAgaWYgKCFvcHRpb25zLm9ubHlTY29wZWQpIHtcbiAgICAgICAgc2VsZWN0b3Iuc2NvcGUuJGluLnB1c2gobnVsbClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gTWV0ZW9yLnJvbGVBc3NpZ25tZW50LmZpbmQoc2VsZWN0b3IsIGZpbHRlcilcbiAgfSxcblxuICAvKipcbiAgICogRGVwcmVjYXRlZC4gVXNlIGBnZXRTY29wZXNGb3JVc2VyYCBpbnN0ZWFkLlxuICAgKlxuICAgKiBAbWV0aG9kIGdldEdyb3Vwc0ZvclVzZXJcbiAgICogQHN0YXRpY1xuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgZ2V0R3JvdXBzRm9yVXNlcjogZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBpZiAoIWdldEdyb3Vwc0ZvclVzZXJEZXByZWNhdGlvbldhcm5pbmcpIHtcbiAgICAgIGdldEdyb3Vwc0ZvclVzZXJEZXByZWNhdGlvbldhcm5pbmcgPSB0cnVlXG4gICAgICBjb25zb2xlICYmIGNvbnNvbGUud2FybignZ2V0R3JvdXBzRm9yVXNlciBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgZ2V0U2NvcGVzRm9yVXNlciBpbnN0ZWFkLicpXG4gICAgfVxuXG4gICAgcmV0dXJuIFJvbGVzLmdldFNjb3Blc0ZvclVzZXIoLi4uYXJncylcbiAgfSxcblxuICAvKipcbiAgICogUmV0cmlldmUgdXNlcnMgc2NvcGVzLCBpZiBhbnkuXG4gICAqXG4gICAqIEBtZXRob2QgZ2V0U2NvcGVzRm9yVXNlclxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVzZXIgVXNlciBJRCBvciBhbiBhY3R1YWwgdXNlciBvYmplY3QuXG4gICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBbcm9sZXNdIE5hbWUgb2Ygcm9sZXMgdG8gcmVzdHJpY3Qgc2NvcGVzIHRvLlxuICAgKlxuICAgKiBAcmV0dXJuIHtBcnJheX0gQXJyYXkgb2YgdXNlcidzIHNjb3BlcywgdW5zb3J0ZWQuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIGdldFNjb3Blc0ZvclVzZXI6IGZ1bmN0aW9uICh1c2VyLCByb2xlcykge1xuICAgIHZhciBzY29wZXNcbiAgICB2YXIgaWRcblxuICAgIGlmIChyb2xlcyAmJiAhQXJyYXkuaXNBcnJheShyb2xlcykpIHJvbGVzID0gW3JvbGVzXVxuXG4gICAgaWYgKHVzZXIgJiYgdHlwZW9mIHVzZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZCA9IHVzZXIuX2lkXG4gICAgfSBlbHNlIHtcbiAgICAgIGlkID0gdXNlclxuICAgIH1cblxuICAgIGlmICghaWQpIHJldHVybiBbXVxuXG4gICAgY29uc3Qgc2VsZWN0b3IgPSB7XG4gICAgICAndXNlci5faWQnOiBpZCxcbiAgICAgIHNjb3BlOiB7ICRuZTogbnVsbCB9XG4gICAgfVxuXG4gICAgaWYgKHJvbGVzKSB7XG4gICAgICBzZWxlY3RvclsnaW5oZXJpdGVkUm9sZXMuX2lkJ10gPSB7ICRpbjogcm9sZXMgfVxuICAgIH1cblxuICAgIHNjb3BlcyA9IE1ldGVvci5yb2xlQXNzaWdubWVudC5maW5kKHNlbGVjdG9yLCB7IGZpZWxkczogeyBzY29wZTogMSB9IH0pLmZldGNoKCkubWFwKG9iaSA9PiBvYmkuc2NvcGUpXG5cbiAgICByZXR1cm4gWy4uLm5ldyBTZXQoc2NvcGVzKV1cbiAgfSxcblxuICAvKipcbiAgICogUmVuYW1lIGEgc2NvcGUuXG4gICAqXG4gICAqIFJvbGVzIGFzc2lnbmVkIHdpdGggYSBnaXZlbiBzY29wZSBhcmUgY2hhbmdlZCB0byBiZSB1bmRlciB0aGUgbmV3IHNjb3BlLlxuICAgKlxuICAgKiBAbWV0aG9kIHJlbmFtZVNjb3BlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvbGROYW1lIE9sZCBuYW1lIG9mIGEgc2NvcGUuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuZXdOYW1lIE5ldyBuYW1lIG9mIGEgc2NvcGUuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHJlbmFtZVNjb3BlOiBmdW5jdGlvbiAob2xkTmFtZSwgbmV3TmFtZSkge1xuICAgIHZhciBjb3VudFxuXG4gICAgUm9sZXMuX2NoZWNrU2NvcGVOYW1lKG9sZE5hbWUpXG4gICAgUm9sZXMuX2NoZWNrU2NvcGVOYW1lKG5ld05hbWUpXG5cbiAgICBpZiAob2xkTmFtZSA9PT0gbmV3TmFtZSkgcmV0dXJuXG5cbiAgICBkbyB7XG4gICAgICBjb3VudCA9IE1ldGVvci5yb2xlQXNzaWdubWVudC51cGRhdGUoe1xuICAgICAgICBzY29wZTogb2xkTmFtZVxuICAgICAgfSwge1xuICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgc2NvcGU6IG5ld05hbWVcbiAgICAgICAgfVxuICAgICAgfSwgeyBtdWx0aTogdHJ1ZSB9KVxuICAgIH0gd2hpbGUgKGNvdW50ID4gMClcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlIGEgc2NvcGUuXG4gICAqXG4gICAqIFJvbGVzIGFzc2lnbmVkIHdpdGggYSBnaXZlbiBzY29wZSBhcmUgcmVtb3ZlZC5cbiAgICpcbiAgICogQG1ldGhvZCByZW1vdmVTY29wZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiBhIHNjb3BlLlxuICAgKiBAc3RhdGljXG4gICAqL1xuICByZW1vdmVTY29wZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBSb2xlcy5fY2hlY2tTY29wZU5hbWUobmFtZSlcblxuICAgIE1ldGVvci5yb2xlQXNzaWdubWVudC5yZW1vdmUoeyBzY29wZTogbmFtZSB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiBUaHJvdyBhbiBleGNlcHRpb24gaWYgYHJvbGVOYW1lYCBpcyBhbiBpbnZhbGlkIHJvbGUgbmFtZS5cbiAgICpcbiAgICogQG1ldGhvZCBfY2hlY2tSb2xlTmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcm9sZU5hbWUgQSByb2xlIG5hbWUgdG8gbWF0Y2ggYWdhaW5zdC5cbiAgICogQHByaXZhdGVcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgX2NoZWNrUm9sZU5hbWU6IGZ1bmN0aW9uIChyb2xlTmFtZSkge1xuICAgIGlmICghcm9sZU5hbWUgfHwgdHlwZW9mIHJvbGVOYW1lICE9PSAnc3RyaW5nJyB8fCByb2xlTmFtZS50cmltKCkgIT09IHJvbGVOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcm9sZSBuYW1lIFxcJycgKyByb2xlTmFtZSArICdcXCcuJylcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpbmQgb3V0IGlmIGEgcm9sZSBpcyBhbiBhbmNlc3RvciBvZiBhbm90aGVyIHJvbGUuXG4gICAqXG4gICAqIFdBUk5JTkc6IElmIHlvdSBjaGVjayB0aGlzIG9uIHRoZSBjbGllbnQsIHBsZWFzZSBtYWtlIHN1cmUgYWxsIHJvbGVzIGFyZSBwdWJsaXNoZWQuXG4gICAqXG4gICAqIEBtZXRob2QgaXNQYXJlbnRPZlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGFyZW50Um9sZU5hbWUgVGhlIHJvbGUgeW91IHdhbnQgdG8gcmVzZWFyY2guXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjaGlsZFJvbGVOYW1lIFRoZSByb2xlIHlvdSBleHBlY3QgdG8gYmUgYW1vbmcgdGhlIGNoaWxkcmVuIG9mIHBhcmVudFJvbGVOYW1lLlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBpc1BhcmVudE9mOiBmdW5jdGlvbiAocGFyZW50Um9sZU5hbWUsIGNoaWxkUm9sZU5hbWUpIHtcbiAgICBpZiAocGFyZW50Um9sZU5hbWUgPT09IGNoaWxkUm9sZU5hbWUpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgaWYgKHBhcmVudFJvbGVOYW1lID09IG51bGwgfHwgY2hpbGRSb2xlTmFtZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBSb2xlcy5fY2hlY2tSb2xlTmFtZShwYXJlbnRSb2xlTmFtZSlcbiAgICBSb2xlcy5fY2hlY2tSb2xlTmFtZShjaGlsZFJvbGVOYW1lKVxuXG4gICAgdmFyIHJvbGVzVG9DaGVjayA9IFtwYXJlbnRSb2xlTmFtZV1cbiAgICB3aGlsZSAocm9sZXNUb0NoZWNrLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdmFyIHJvbGVOYW1lID0gcm9sZXNUb0NoZWNrLnBvcCgpXG5cbiAgICAgIGlmIChyb2xlTmFtZSA9PT0gY2hpbGRSb2xlTmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICB2YXIgcm9sZSA9IE1ldGVvci5yb2xlcy5maW5kT25lKHsgX2lkOiByb2xlTmFtZSB9KVxuXG4gICAgICAvLyBUaGlzIHNob3VsZCBub3QgaGFwcGVuLCBidXQgdGhpcyBpcyBhIHByb2JsZW0gdG8gYWRkcmVzcyBhdCBzb21lIG90aGVyIHRpbWUuXG4gICAgICBpZiAoIXJvbGUpIGNvbnRpbnVlXG5cbiAgICAgIHJvbGVzVG9DaGVjayA9IHJvbGVzVG9DaGVjay5jb25jYXQocm9sZS5jaGlsZHJlbi5tYXAociA9PiByLl9pZCkpXG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH0sXG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBvcHRpb25zLlxuICAgKlxuICAgKiBAbWV0aG9kIF9ub3JtYWxpemVPcHRpb25zXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIE9wdGlvbnMgdG8gbm9ybWFsaXplLlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IE5vcm1hbGl6ZWQgb3B0aW9ucy5cbiAgICogQHByaXZhdGVcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgX25vcm1hbGl6ZU9wdGlvbnM6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgPT09IHVuZGVmaW5lZCA/IHt9IDogb3B0aW9uc1xuXG4gICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgdHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBvcHRpb25zID0geyBzY29wZTogb3B0aW9ucyB9XG4gICAgfVxuXG4gICAgb3B0aW9ucy5zY29wZSA9IFJvbGVzLl9ub3JtYWxpemVTY29wZU5hbWUob3B0aW9ucy5zY29wZSlcblxuICAgIHJldHVybiBvcHRpb25zXG4gIH0sXG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBzY29wZSBuYW1lLlxuICAgKlxuICAgKiBAbWV0aG9kIF9ub3JtYWxpemVTY29wZU5hbWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNjb3BlTmFtZSBBIHNjb3BlIG5hbWUgdG8gbm9ybWFsaXplLlxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IE5vcm1hbGl6ZWQgc2NvcGUgbmFtZS5cbiAgICogQHByaXZhdGVcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgX25vcm1hbGl6ZVNjb3BlTmFtZTogZnVuY3Rpb24gKHNjb3BlTmFtZSkge1xuICAgIC8vIG1hcCB1bmRlZmluZWQgYW5kIG51bGwgdG8gbnVsbFxuICAgIGlmIChzY29wZU5hbWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNjb3BlTmFtZVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogVGhyb3cgYW4gZXhjZXB0aW9uIGlmIGBzY29wZU5hbWVgIGlzIGFuIGludmFsaWQgc2NvcGUgbmFtZS5cbiAgICpcbiAgICogQG1ldGhvZCBfY2hlY2tSb2xlTmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2NvcGVOYW1lIEEgc2NvcGUgbmFtZSB0byBtYXRjaCBhZ2FpbnN0LlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAc3RhdGljXG4gICAqL1xuICBfY2hlY2tTY29wZU5hbWU6IGZ1bmN0aW9uIChzY29wZU5hbWUpIHtcbiAgICBpZiAoc2NvcGVOYW1lID09PSBudWxsKSByZXR1cm5cblxuICAgIGlmICghc2NvcGVOYW1lIHx8IHR5cGVvZiBzY29wZU5hbWUgIT09ICdzdHJpbmcnIHx8IHNjb3BlTmFtZS50cmltKCkgIT09IHNjb3BlTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHNjb3BlIG5hbWUgXFwnJyArIHNjb3BlTmFtZSArICdcXCcuJylcbiAgICB9XG4gIH1cbn0pXG4iLCIvKiBnbG9iYWwgTWV0ZW9yLCBSb2xlcyAqL1xuXG5NZXRlb3Iucm9sZUFzc2lnbm1lbnQuX2Vuc3VyZUluZGV4KHsgJ3VzZXIuX2lkJzogMSwgJ2luaGVyaXRlZFJvbGVzLl9pZCc6IDEsIHNjb3BlOiAxIH0pXG5NZXRlb3Iucm9sZUFzc2lnbm1lbnQuX2Vuc3VyZUluZGV4KHsgJ3VzZXIuX2lkJzogMSwgJ3JvbGUuX2lkJzogMSwgc2NvcGU6IDEgfSlcbk1ldGVvci5yb2xlQXNzaWdubWVudC5fZW5zdXJlSW5kZXgoeyAncm9sZS5faWQnOiAxIH0pXG5NZXRlb3Iucm9sZUFzc2lnbm1lbnQuX2Vuc3VyZUluZGV4KHsgc2NvcGU6IDEsICd1c2VyLl9pZCc6IDEsICdpbmhlcml0ZWRSb2xlcy5faWQnOiAxIH0pIC8vIEFkZGluZyB1c2VySWQgYW5kIHJvbGVJZCBtaWdodCBzcGVlZCB1cCBvdGhlciBxdWVyaWVzIGRlcGVuZGluZyBvbiB0aGUgZmlyc3QgaW5kZXhcbk1ldGVvci5yb2xlQXNzaWdubWVudC5fZW5zdXJlSW5kZXgoeyAnaW5oZXJpdGVkUm9sZXMuX2lkJzogMSB9KVxuXG5NZXRlb3Iucm9sZXMuX2Vuc3VyZUluZGV4KHsgJ2NoaWxkcmVuLl9pZCc6IDEgfSlcblxuLypcbiAqIFB1Ymxpc2ggbG9nZ2VkLWluIHVzZXIncyByb2xlcyBzbyBjbGllbnQtc2lkZSBjaGVja3MgY2FuIHdvcmsuXG4gKlxuICogVXNlIGEgbmFtZWQgcHVibGlzaCBmdW5jdGlvbiBzbyBjbGllbnRzIGNhbiBjaGVjayBgcmVhZHkoKWAgc3RhdGUuXG4gKi9cbk1ldGVvci5wdWJsaXNoKCdfcm9sZXMnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBsb2dnZWRJblVzZXJJZCA9IHRoaXMudXNlcklkXG4gIHZhciBmaWVsZHMgPSB7IHJvbGVzOiAxIH1cblxuICBpZiAoIWxvZ2dlZEluVXNlcklkKSB7XG4gICAgdGhpcy5yZWFkeSgpXG4gICAgcmV0dXJuXG4gIH1cblxuICByZXR1cm4gTWV0ZW9yLnVzZXJzLmZpbmQoXG4gICAgeyBfaWQ6IGxvZ2dlZEluVXNlcklkIH0sXG4gICAgeyBmaWVsZHM6IGZpZWxkcyB9XG4gIClcbn0pXG5cbk9iamVjdC5hc3NpZ24oUm9sZXMsIHtcbiAgLyoqXG4gICAqIEBtZXRob2QgX2lzTmV3Um9sZVxuICAgKiBAcGFyYW0ge09iamVjdH0gcm9sZSBgTWV0ZW9yLnJvbGVzYCBkb2N1bWVudC5cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGByb2xlYCBpcyBpbiB0aGUgbmV3IGZvcm1hdC5cbiAgICogICAgICAgICAgICAgICAgICAgSWYgaXQgaXMgYW1iaWd1b3VzIG9yIGl0IGlzIG5vdCwgcmV0dXJucyBgZmFsc2VgLlxuICAgKiBAZm9yIFJvbGVzXG4gICAqIEBwcml2YXRlXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIF9pc05ld1JvbGU6IGZ1bmN0aW9uIChyb2xlKSB7XG4gICAgcmV0dXJuICEoJ25hbWUnIGluIHJvbGUpICYmICdjaGlsZHJlbicgaW4gcm9sZVxuICB9LFxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9pc09sZFJvbGVcbiAgICogQHBhcmFtIHtPYmplY3R9IHJvbGUgYE1ldGVvci5yb2xlc2AgZG9jdW1lbnQuXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBgcm9sZWAgaXMgaW4gdGhlIG9sZCBmb3JtYXQuXG4gICAqICAgICAgICAgICAgICAgICAgIElmIGl0IGlzIGFtYmlndW91cyBvciBpdCBpcyBub3QsIHJldHVybnMgYGZhbHNlYC5cbiAgICogQGZvciBSb2xlc1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAc3RhdGljXG4gICAqL1xuICBfaXNPbGRSb2xlOiBmdW5jdGlvbiAocm9sZSkge1xuICAgIHJldHVybiAnbmFtZScgaW4gcm9sZSAmJiAhKCdjaGlsZHJlbicgaW4gcm9sZSlcbiAgfSxcblxuICAvKipcbiAgICogQG1ldGhvZCBfaXNOZXdGaWVsZFxuICAgKiBAcGFyYW0ge0FycmF5fSByb2xlcyBgTWV0ZW9yLnVzZXJzYCBkb2N1bWVudCBgcm9sZXNgIGZpZWxkLlxuICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYHJvbGVzYCBmaWVsZCBpcyBpbiB0aGUgbmV3IGZvcm1hdC5cbiAgICogICAgICAgICAgICAgICAgICAgSWYgaXQgaXMgYW1iaWd1b3VzIG9yIGl0IGlzIG5vdCwgcmV0dXJucyBgZmFsc2VgLlxuICAgKiBAZm9yIFJvbGVzXG4gICAqIEBwcml2YXRlXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIF9pc05ld0ZpZWxkOiBmdW5jdGlvbiAocm9sZXMpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShyb2xlcykgJiYgKHR5cGVvZiByb2xlc1swXSA9PT0gJ29iamVjdCcpXG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX2lzT2xkRmllbGRcbiAgICogQHBhcmFtIHtBcnJheX0gcm9sZXMgYE1ldGVvci51c2Vyc2AgZG9jdW1lbnQgYHJvbGVzYCBmaWVsZC5cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGByb2xlc2AgZmllbGQgaXMgaW4gdGhlIG9sZCBmb3JtYXQuXG4gICAqICAgICAgICAgICAgICAgICAgIElmIGl0IGlzIGFtYmlndW91cyBvciBpdCBpcyBub3QsIHJldHVybnMgYGZhbHNlYC5cbiAgICogQGZvciBSb2xlc1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAc3RhdGljXG4gICAqL1xuICBfaXNPbGRGaWVsZDogZnVuY3Rpb24gKHJvbGVzKSB7XG4gICAgcmV0dXJuIChBcnJheS5pc0FycmF5KHJvbGVzKSAmJiAodHlwZW9mIHJvbGVzWzBdID09PSAnc3RyaW5nJykpIHx8ICgodHlwZW9mIHJvbGVzID09PSAnb2JqZWN0JykgJiYgIUFycmF5LmlzQXJyYXkocm9sZXMpKVxuICB9LFxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9jb252ZXJ0VG9OZXdSb2xlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvbGRSb2xlIGBNZXRlb3Iucm9sZXNgIGRvY3VtZW50LlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IENvbnZlcnRlZCBgcm9sZWAgdG8gdGhlIG5ldyBmb3JtYXQuXG4gICAqIEBmb3IgUm9sZXNcbiAgICogQHByaXZhdGVcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgX2NvbnZlcnRUb05ld1JvbGU6IGZ1bmN0aW9uIChvbGRSb2xlKSB7XG4gICAgaWYgKCEodHlwZW9mIG9sZFJvbGUubmFtZSA9PT0gJ3N0cmluZycpKSB0aHJvdyBuZXcgRXJyb3IoXCJSb2xlIG5hbWUgJ1wiICsgb2xkUm9sZS5uYW1lICsgXCInIGlzIG5vdCBhIHN0cmluZy5cIilcblxuICAgIHJldHVybiB7XG4gICAgICBfaWQ6IG9sZFJvbGUubmFtZSxcbiAgICAgIGNoaWxkcmVuOiBbXVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQG1ldGhvZCBfY29udmVydFRvT2xkUm9sZVxuICAgKiBAcGFyYW0ge09iamVjdH0gbmV3Um9sZSBgTWV0ZW9yLnJvbGVzYCBkb2N1bWVudC5cbiAgICogQHJldHVybiB7T2JqZWN0fSBDb252ZXJ0ZWQgYHJvbGVgIHRvIHRoZSBvbGQgZm9ybWF0LlxuICAgKiBAZm9yIFJvbGVzXG4gICAqIEBwcml2YXRlXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIF9jb252ZXJ0VG9PbGRSb2xlOiBmdW5jdGlvbiAobmV3Um9sZSkge1xuICAgIGlmICghKHR5cGVvZiBuZXdSb2xlLl9pZCA9PT0gJ3N0cmluZycpKSB0aHJvdyBuZXcgRXJyb3IoXCJSb2xlIG5hbWUgJ1wiICsgbmV3Um9sZS5faWQgKyBcIicgaXMgbm90IGEgc3RyaW5nLlwiKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IG5ld1JvbGUuX2lkXG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9jb252ZXJ0VG9OZXdGaWVsZFxuICAgKiBAcGFyYW0ge0FycmF5fSBvbGRSb2xlcyBgTWV0ZW9yLnVzZXJzYCBkb2N1bWVudCBgcm9sZXNgIGZpZWxkIGluIHRoZSBvbGQgZm9ybWF0LlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGNvbnZlcnRVbmRlcnNjb3Jlc1RvRG90cyBTaG91bGQgd2UgY29udmVydCB1bmRlcnNjb3JlcyB0byBkb3RzIGluIGdyb3VwIG5hbWVzLlxuICAgKiBAcmV0dXJuIHtBcnJheX0gQ29udmVydGVkIGByb2xlc2AgdG8gdGhlIG5ldyBmb3JtYXQuXG4gICAqIEBmb3IgUm9sZXNcbiAgICogQHByaXZhdGVcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgX2NvbnZlcnRUb05ld0ZpZWxkOiBmdW5jdGlvbiAob2xkUm9sZXMsIGNvbnZlcnRVbmRlcnNjb3Jlc1RvRG90cykge1xuICAgIHZhciByb2xlcyA9IFtdXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2xkUm9sZXMpKSB7XG4gICAgICBvbGRSb2xlcy5mb3JFYWNoKGZ1bmN0aW9uIChyb2xlLCBpbmRleCkge1xuICAgICAgICBpZiAoISh0eXBlb2Ygcm9sZSA9PT0gJ3N0cmluZycpKSB0aHJvdyBuZXcgRXJyb3IoXCJSb2xlICdcIiArIHJvbGUgKyBcIicgaXMgbm90IGEgc3RyaW5nLlwiKVxuXG4gICAgICAgIHJvbGVzLnB1c2goe1xuICAgICAgICAgIF9pZDogcm9sZSxcbiAgICAgICAgICBzY29wZTogbnVsbCxcbiAgICAgICAgICBhc3NpZ25lZDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvbGRSb2xlcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKG9sZFJvbGVzKS5mb3JFYWNoKChbZ3JvdXAsIHJvbGVzQXJyYXldKSA9PiB7XG4gICAgICAgIGlmIChncm91cCA9PT0gJ19fZ2xvYmFsX3JvbGVzX18nKSB7XG4gICAgICAgICAgZ3JvdXAgPSBudWxsXG4gICAgICAgIH0gZWxzZSBpZiAoY29udmVydFVuZGVyc2NvcmVzVG9Eb3RzKSB7XG4gICAgICAgICAgLy8gdW5lc2NhcGVcbiAgICAgICAgICBncm91cCA9IGdyb3VwLnJlcGxhY2UoL18vZywgJy4nKVxuICAgICAgICB9XG5cbiAgICAgICAgcm9sZXNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChyb2xlKSB7XG4gICAgICAgICAgaWYgKCEodHlwZW9mIHJvbGUgPT09ICdzdHJpbmcnKSkgdGhyb3cgbmV3IEVycm9yKFwiUm9sZSAnXCIgKyByb2xlICsgXCInIGlzIG5vdCBhIHN0cmluZy5cIilcblxuICAgICAgICAgIHJvbGVzLnB1c2goe1xuICAgICAgICAgICAgX2lkOiByb2xlLFxuICAgICAgICAgICAgc2NvcGU6IGdyb3VwLFxuICAgICAgICAgICAgYXNzaWduZWQ6IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHJvbGVzXG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX2NvbnZlcnRUb09sZEZpZWxkXG4gICAqIEBwYXJhbSB7QXJyYXl9IG5ld1JvbGVzIGBNZXRlb3IudXNlcnNgIGRvY3VtZW50IGByb2xlc2AgZmllbGQgaW4gdGhlIG5ldyBmb3JtYXQuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gdXNpbmdHcm91cHMgU2hvdWxkIHdlIHVzZSBncm91cHMgb3Igbm90LlxuICAgKiBAcmV0dXJuIHtBcnJheX0gQ29udmVydGVkIGByb2xlc2AgdG8gdGhlIG9sZCBmb3JtYXQuXG4gICAqIEBmb3IgUm9sZXNcbiAgICogQHByaXZhdGVcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgX2NvbnZlcnRUb09sZEZpZWxkOiBmdW5jdGlvbiAobmV3Um9sZXMsIHVzaW5nR3JvdXBzKSB7XG4gICAgdmFyIHJvbGVzXG5cbiAgICBpZiAodXNpbmdHcm91cHMpIHtcbiAgICAgIHJvbGVzID0ge31cbiAgICB9IGVsc2Uge1xuICAgICAgcm9sZXMgPSBbXVxuICAgIH1cblxuICAgIG5ld1JvbGVzLmZvckVhY2goZnVuY3Rpb24gKHVzZXJSb2xlKSB7XG4gICAgICBpZiAoISh0eXBlb2YgdXNlclJvbGUgPT09ICdvYmplY3QnKSkgdGhyb3cgbmV3IEVycm9yKFwiUm9sZSAnXCIgKyB1c2VyUm9sZSArIFwiJyBpcyBub3QgYW4gb2JqZWN0LlwiKVxuXG4gICAgICAvLyBXZSBhc3N1bWUgdGhhdCB3ZSBhcmUgY29udmVydGluZyBiYWNrIGEgZmFpbGVkIG1pZ3JhdGlvbiwgc28gdmFsdWVzIGNhbiBvbmx5IGJlXG4gICAgICAvLyB3aGF0IHdlcmUgdmFsaWQgdmFsdWVzIGluIDEuMC4gU28gbm8gZ3JvdXAgbmFtZXMgc3RhcnRpbmcgd2l0aCAkIGFuZCBubyBzdWJyb2xlcy5cblxuICAgICAgaWYgKHVzZXJSb2xlLnNjb3BlKSB7XG4gICAgICAgIGlmICghdXNpbmdHcm91cHMpIHRocm93IG5ldyBFcnJvcihcIlJvbGUgJ1wiICsgdXNlclJvbGUuX2lkICsgXCInIHdpdGggc2NvcGUgJ1wiICsgdXNlclJvbGUuc2NvcGUgKyBcIicgd2l0aG91dCBlbmFibGVkIGdyb3Vwcy5cIilcblxuICAgICAgICAvLyBlc2NhcGVcbiAgICAgICAgdmFyIHNjb3BlID0gdXNlclJvbGUuc2NvcGUucmVwbGFjZSgvXFwuL2csICdfJylcblxuICAgICAgICBpZiAoc2NvcGVbMF0gPT09ICckJykgdGhyb3cgbmV3IEVycm9yKFwiR3JvdXAgbmFtZSAnXCIgKyBzY29wZSArIFwiJyBzdGFydCB3aXRoICQuXCIpXG5cbiAgICAgICAgcm9sZXNbc2NvcGVdID0gcm9sZXNbc2NvcGVdIHx8IFtdXG4gICAgICAgIHJvbGVzW3Njb3BlXS5wdXNoKHVzZXJSb2xlLl9pZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh1c2luZ0dyb3Vwcykge1xuICAgICAgICAgIHJvbGVzLl9fZ2xvYmFsX3JvbGVzX18gPSByb2xlcy5fX2dsb2JhbF9yb2xlc19fIHx8IFtdXG4gICAgICAgICAgcm9sZXMuX19nbG9iYWxfcm9sZXNfXy5wdXNoKHVzZXJSb2xlLl9pZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb2xlcy5wdXNoKHVzZXJSb2xlLl9pZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHJvbGVzXG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX2RlZmF1bHRVcGRhdGVVc2VyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB1c2VyIGBNZXRlb3IudXNlcnNgIGRvY3VtZW50LlxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gcm9sZXMgVmFsdWUgdG8gd2hpY2ggdXNlcidzIGByb2xlc2AgZmllbGQgc2hvdWxkIGJlIHNldC5cbiAgICogQGZvciBSb2xlc1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAc3RhdGljXG4gICAqL1xuICBfZGVmYXVsdFVwZGF0ZVVzZXI6IGZ1bmN0aW9uICh1c2VyLCByb2xlcykge1xuICAgIE1ldGVvci51c2Vycy51cGRhdGUoe1xuICAgICAgX2lkOiB1c2VyLl9pZCxcbiAgICAgIC8vIG1ha2luZyBzdXJlIG5vdGhpbmcgY2hhbmdlZCBpbiBtZWFudGltZVxuICAgICAgcm9sZXM6IHVzZXIucm9sZXNcbiAgICB9LCB7XG4gICAgICAkc2V0OiB7IHJvbGVzIH1cbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9kZWZhdWx0VXBkYXRlUm9sZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb2xkUm9sZSBPbGQgYE1ldGVvci5yb2xlc2AgZG9jdW1lbnQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBuZXdSb2xlIE5ldyBgTWV0ZW9yLnJvbGVzYCBkb2N1bWVudC5cbiAgICogQGZvciBSb2xlc1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAc3RhdGljXG4gICAqL1xuICBfZGVmYXVsdFVwZGF0ZVJvbGU6IGZ1bmN0aW9uIChvbGRSb2xlLCBuZXdSb2xlKSB7XG4gICAgTWV0ZW9yLnJvbGVzLnJlbW92ZShvbGRSb2xlLl9pZClcbiAgICBNZXRlb3Iucm9sZXMuaW5zZXJ0KG5ld1JvbGUpXG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX2Ryb3BDb2xsZWN0aW9uSW5kZXhcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbGxlY3Rpb24gQ29sbGVjdGlvbiBvbiB3aGljaCB0byBkcm9wIHRoZSBpbmRleC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGluZGV4TmFtZSBOYW1lIG9mIHRoZSBpbmRleCB0byBkcm9wLlxuICAgKiBAZm9yIFJvbGVzXG4gICAqIEBwcml2YXRlXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIF9kcm9wQ29sbGVjdGlvbkluZGV4OiBmdW5jdGlvbiAoY29sbGVjdGlvbiwgaW5kZXhOYW1lKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbGxlY3Rpb24uX2Ryb3BJbmRleChpbmRleE5hbWUpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ01vbmdvRXJyb3InKSB0aHJvdyBlXG4gICAgICBpZiAoIS9pbmRleCBub3QgZm91bmQvLnRlc3QoZS5lcnIgfHwgZS5lcnJtc2cpKSB0aHJvdyBlXG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBNaWdyYXRlcyBgTWV0ZW9yLnVzZXJzYCBhbmQgYE1ldGVvci5yb2xlc2AgdG8gdGhlIG5ldyBmb3JtYXQuXG4gICAqXG4gICAqIEBtZXRob2QgX2ZvcndhcmRNaWdyYXRlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHVwZGF0ZVVzZXIgRnVuY3Rpb24gd2hpY2ggdXBkYXRlcyB0aGUgdXNlciBvYmplY3QuIERlZmF1bHQgYF9kZWZhdWx0VXBkYXRlVXNlcmAuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHVwZGF0ZVJvbGUgRnVuY3Rpb24gd2hpY2ggdXBkYXRlcyB0aGUgcm9sZSBvYmplY3QuIERlZmF1bHQgYF9kZWZhdWx0VXBkYXRlUm9sZWAuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gY29udmVydFVuZGVyc2NvcmVzVG9Eb3RzIFNob3VsZCB3ZSBjb252ZXJ0IHVuZGVyc2NvcmVzIHRvIGRvdHMgaW4gZ3JvdXAgbmFtZXMuXG4gICAqIEBmb3IgUm9sZXNcbiAgICogQHByaXZhdGVcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgX2ZvcndhcmRNaWdyYXRlOiBmdW5jdGlvbiAodXBkYXRlVXNlciwgdXBkYXRlUm9sZSwgY29udmVydFVuZGVyc2NvcmVzVG9Eb3RzKSB7XG4gICAgdXBkYXRlVXNlciA9IHVwZGF0ZVVzZXIgfHwgUm9sZXMuX2RlZmF1bHRVcGRhdGVVc2VyXG4gICAgdXBkYXRlUm9sZSA9IHVwZGF0ZVJvbGUgfHwgUm9sZXMuX2RlZmF1bHRVcGRhdGVSb2xlXG5cbiAgICBSb2xlcy5fZHJvcENvbGxlY3Rpb25JbmRleChNZXRlb3Iucm9sZXMsICduYW1lXzEnKVxuXG4gICAgTWV0ZW9yLnJvbGVzLmZpbmQoKS5mb3JFYWNoKGZ1bmN0aW9uIChyb2xlLCBpbmRleCwgY3Vyc29yKSB7XG4gICAgICBpZiAoIVJvbGVzLl9pc05ld1JvbGUocm9sZSkpIHtcbiAgICAgICAgdXBkYXRlUm9sZShyb2xlLCBSb2xlcy5fY29udmVydFRvTmV3Um9sZShyb2xlKSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgTWV0ZW9yLnVzZXJzLmZpbmQoKS5mb3JFYWNoKGZ1bmN0aW9uICh1c2VyLCBpbmRleCwgY3Vyc29yKSB7XG4gICAgICBpZiAoIVJvbGVzLl9pc05ld0ZpZWxkKHVzZXIucm9sZXMpKSB7XG4gICAgICAgIHVwZGF0ZVVzZXIodXNlciwgUm9sZXMuX2NvbnZlcnRUb05ld0ZpZWxkKHVzZXIucm9sZXMsIGNvbnZlcnRVbmRlcnNjb3Jlc1RvRG90cykpXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICogTW92ZXMgdGhlIGFzc2lnbm1lbnRzIGZyb20gYE1ldGVvci51c2Vyc2AgdG8gYE1ldGVvci5yb2xlQXNzaWdubWVudGAuXG4gICAqXG4gICAqIEBtZXRob2QgX2ZvcndhcmRNaWdyYXRlMlxuICAgKiBAcGFyYW0ge09iamVjdH0gdXNlclNlbGVjdG9yIEFuIG9wcG9ydHVuaXR5IHRvIHNoYXJlIHRoZSB3b3JrIGFtb25nIGluc3RhbmNlcy4gSXQncyBhZHZpc2FibGUgdG8gZG8gdGhlIGRpdmlzaW9uIGJhc2VkIG9uIHVzZXItaWQuXG4gICAqIEBmb3IgUm9sZXNcbiAgICogQHByaXZhdGVcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgX2ZvcndhcmRNaWdyYXRlMjogZnVuY3Rpb24gKHVzZXJTZWxlY3Rvcikge1xuICAgIHVzZXJTZWxlY3RvciA9IHVzZXJTZWxlY3RvciB8fCB7fVxuICAgIE9iamVjdC5hc3NpZ24odXNlclNlbGVjdG9yLCB7IHJvbGVzOiB7ICRuZTogbnVsbCB9IH0pXG5cbiAgICBNZXRlb3IudXNlcnMuZmluZCh1c2VyU2VsZWN0b3IpLmZvckVhY2goZnVuY3Rpb24gKHVzZXIsIGluZGV4KSB7XG4gICAgICB1c2VyLnJvbGVzLmZpbHRlcigocikgPT4gci5hc3NpZ25lZCkuZm9yRWFjaChyID0+IHtcbiAgICAgICAgLy8gQWRkZWQgYGlmRXhpc3RzYCB0byBtYWtlIGl0IGxlc3MgZXJyb3ItcHJvbmVcbiAgICAgICAgUm9sZXMuX2FkZFVzZXJUb1JvbGUodXNlci5faWQsIHIuX2lkLCB7IHNjb3BlOiByLnNjb3BlLCBpZkV4aXN0czogdHJ1ZSB9KVxuICAgICAgfSlcblxuICAgICAgTWV0ZW9yLnVzZXJzLnVwZGF0ZSh7IF9pZDogdXNlci5faWQgfSwgeyAkdW5zZXQ6IHsgcm9sZXM6ICcnIH0gfSlcbiAgICB9KVxuXG4gICAgLy8gTm8gbmVlZCB0byBrZWVwIHRoZSBpbmRleGVzIGFyb3VuZFxuICAgIFJvbGVzLl9kcm9wQ29sbGVjdGlvbkluZGV4KE1ldGVvci51c2VycywgJ3JvbGVzLl9pZF8xX3JvbGVzLnNjb3BlXzEnKVxuICAgIFJvbGVzLl9kcm9wQ29sbGVjdGlvbkluZGV4KE1ldGVvci51c2VycywgJ3JvbGVzLnNjb3BlXzEnKVxuICB9LFxuXG4gIC8qKlxuICAgKiBNaWdyYXRlcyBgTWV0ZW9yLnVzZXJzYCBhbmQgYE1ldGVvci5yb2xlc2AgdG8gdGhlIG9sZCBmb3JtYXQuXG4gICAqXG4gICAqIFdlIGFzc3VtZSB0aGF0IHdlIGFyZSBjb252ZXJ0aW5nIGJhY2sgYSBmYWlsZWQgbWlncmF0aW9uLCBzbyB2YWx1ZXMgY2FuIG9ubHkgYmVcbiAgICogd2hhdCB3ZXJlIHZhbGlkIHZhbHVlcyBpbiB0aGUgb2xkIGZvcm1hdC4gU28gbm8gZ3JvdXAgbmFtZXMgc3RhcnRpbmcgd2l0aCBgJGAgYW5kXG4gICAqIG5vIHN1YnJvbGVzLlxuICAgKlxuICAgKiBAbWV0aG9kIF9iYWNrd2FyZE1pZ3JhdGVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gdXBkYXRlVXNlciBGdW5jdGlvbiB3aGljaCB1cGRhdGVzIHRoZSB1c2VyIG9iamVjdC4gRGVmYXVsdCBgX2RlZmF1bHRVcGRhdGVVc2VyYC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gdXBkYXRlUm9sZSBGdW5jdGlvbiB3aGljaCB1cGRhdGVzIHRoZSByb2xlIG9iamVjdC4gRGVmYXVsdCBgX2RlZmF1bHRVcGRhdGVSb2xlYC5cbiAgICogQHBhcmFtIHtCb29sZWFufSB1c2luZ0dyb3VwcyBTaG91bGQgd2UgdXNlIGdyb3VwcyBvciBub3QuXG4gICAqIEBmb3IgUm9sZXNcbiAgICogQHByaXZhdGVcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgX2JhY2t3YXJkTWlncmF0ZTogZnVuY3Rpb24gKHVwZGF0ZVVzZXIsIHVwZGF0ZVJvbGUsIHVzaW5nR3JvdXBzKSB7XG4gICAgdXBkYXRlVXNlciA9IHVwZGF0ZVVzZXIgfHwgUm9sZXMuX2RlZmF1bHRVcGRhdGVVc2VyXG4gICAgdXBkYXRlUm9sZSA9IHVwZGF0ZVJvbGUgfHwgUm9sZXMuX2RlZmF1bHRVcGRhdGVSb2xlXG5cbiAgICBSb2xlcy5fZHJvcENvbGxlY3Rpb25JbmRleChNZXRlb3IudXNlcnMsICdyb2xlcy5faWRfMV9yb2xlcy5zY29wZV8xJylcbiAgICBSb2xlcy5fZHJvcENvbGxlY3Rpb25JbmRleChNZXRlb3IudXNlcnMsICdyb2xlcy5zY29wZV8xJylcblxuICAgIE1ldGVvci5yb2xlcy5maW5kKCkuZm9yRWFjaChmdW5jdGlvbiAocm9sZSwgaW5kZXgsIGN1cnNvcikge1xuICAgICAgaWYgKCFSb2xlcy5faXNPbGRSb2xlKHJvbGUpKSB7XG4gICAgICAgIHVwZGF0ZVJvbGUocm9sZSwgUm9sZXMuX2NvbnZlcnRUb09sZFJvbGUocm9sZSkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIE1ldGVvci51c2Vycy5maW5kKCkuZm9yRWFjaChmdW5jdGlvbiAodXNlciwgaW5kZXgsIGN1cnNvcikge1xuICAgICAgaWYgKCFSb2xlcy5faXNPbGRGaWVsZCh1c2VyLnJvbGVzKSkge1xuICAgICAgICB1cGRhdGVVc2VyKHVzZXIsIFJvbGVzLl9jb252ZXJ0VG9PbGRGaWVsZCh1c2VyLnJvbGVzLCB1c2luZ0dyb3VwcykpXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICogTW92ZXMgdGhlIGFzc2lnbm1lbnRzIGZyb20gYE1ldGVvci5yb2xlQXNzaWdubWVudGAgYmFjayB0byB0byBgTWV0ZW9yLnVzZXJzYC5cbiAgICpcbiAgICogQG1ldGhvZCBfYmFja3dhcmRNaWdyYXRlMlxuICAgKiBAcGFyYW0ge09iamVjdH0gYXNzaWdubWVudFNlbGVjdG9yIEFuIG9wcG9ydHVuaXR5IHRvIHNoYXJlIHRoZSB3b3JrIGFtb25nIGluc3RhbmNlcy4gSXQncyBhZHZpc2FibGUgdG8gZG8gdGhlIGRpdmlzaW9uIGJhc2VkIG9uIHVzZXItaWQuXG4gICAqIEBmb3IgUm9sZXNcbiAgICogQHByaXZhdGVcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgX2JhY2t3YXJkTWlncmF0ZTI6IGZ1bmN0aW9uIChhc3NpZ25tZW50U2VsZWN0b3IpIHtcbiAgICBhc3NpZ25tZW50U2VsZWN0b3IgPSBhc3NpZ25tZW50U2VsZWN0b3IgfHwge31cblxuICAgIE1ldGVvci51c2Vycy5fZW5zdXJlSW5kZXgoeyAncm9sZXMuX2lkJzogMSwgJ3JvbGVzLnNjb3BlJzogMSB9KVxuICAgIE1ldGVvci51c2Vycy5fZW5zdXJlSW5kZXgoeyAncm9sZXMuc2NvcGUnOiAxIH0pXG5cbiAgICBNZXRlb3Iucm9sZUFzc2lnbm1lbnQuZmluZChhc3NpZ25tZW50U2VsZWN0b3IpLmZvckVhY2gociA9PiB7XG4gICAgICBjb25zdCByb2xlcyA9IE1ldGVvci51c2Vycy5maW5kT25lKHsgX2lkOiByLnVzZXIuX2lkIH0pLnJvbGVzIHx8IFtdXG5cbiAgICAgIGNvbnN0IGN1cnJlbnRSb2xlID0gcm9sZXMuZmluZChvbGRSb2xlID0+IG9sZFJvbGUuX2lkID09PSByLnJvbGUuX2lkICYmIG9sZFJvbGUuc2NvcGUgPT09IHIuc2NvcGUpXG4gICAgICBpZiAoY3VycmVudFJvbGUpIHtcbiAgICAgICAgY3VycmVudFJvbGUuYXNzaWduZWQgPSB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb2xlcy5wdXNoKHtcbiAgICAgICAgICBfaWQ6IHIucm9sZS5faWQsXG4gICAgICAgICAgc2NvcGU6IHIuc2NvcGUsXG4gICAgICAgICAgYXNzaWduZWQ6IHRydWVcbiAgICAgICAgfSlcblxuICAgICAgICByLmluaGVyaXRlZFJvbGVzLmZvckVhY2goaW5oZXJpdGVkUm9sZSA9PiB7XG4gICAgICAgICAgY29uc3QgY3VycmVudEluaGVyaXRlZFJvbGUgPSByb2xlcy5maW5kKG9sZFJvbGUgPT4gb2xkUm9sZS5faWQgPT09IGluaGVyaXRlZFJvbGUuX2lkICYmIG9sZFJvbGUuc2NvcGUgPT09IHIuc2NvcGUpXG5cbiAgICAgICAgICBpZiAoIWN1cnJlbnRJbmhlcml0ZWRSb2xlKSB7XG4gICAgICAgICAgICByb2xlcy5wdXNoKHtcbiAgICAgICAgICAgICAgX2lkOiBpbmhlcml0ZWRSb2xlLl9pZCxcbiAgICAgICAgICAgICAgc2NvcGU6IHIuc2NvcGUsXG4gICAgICAgICAgICAgIGFzc2lnbmVkOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIE1ldGVvci51c2Vycy51cGRhdGUoeyBfaWQ6IHIudXNlci5faWQgfSwgeyAkc2V0OiB7IHJvbGVzIH0gfSlcbiAgICAgIE1ldGVvci5yb2xlQXNzaWdubWVudC5yZW1vdmUoeyBfaWQ6IHIuX2lkIH0pXG4gICAgfSlcbiAgfVxufSlcbiJdfQ==
