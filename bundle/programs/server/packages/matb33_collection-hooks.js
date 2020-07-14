(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var EJSON = Package.ejson.EJSON;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var CollectionHooks;

var require = meteorInstall({"node_modules":{"meteor":{"matb33:collection-hooks":{"server.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/matb33_collection-hooks/server.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  CollectionHooks: () => CollectionHooks
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let CollectionHooks;
module.link("./collection-hooks", {
  CollectionHooks(v) {
    CollectionHooks = v;
  }

}, 1);
module.link("./advices");
const publishUserId = new Meteor.EnvironmentVariable();

CollectionHooks.getUserId = function getUserId() {
  let userId;

  try {
    // Will throw an error unless within method call.
    // Attempt to recover gracefully by catching:
    userId = Meteor.userId && Meteor.userId();
  } catch (e) {}

  if (userId == null) {
    // Get the userId if we are in a publish function.
    userId = publishUserId.get();
  }

  if (userId == null) {
    userId = CollectionHooks.defaultUserId;
  }

  return userId;
};

const _publish = Meteor.publish;

Meteor.publish = function (name, handler, options) {
  return _publish.call(this, name, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // This function is called repeatedly in publications
    return publishUserId.withValue(this && this.userId, () => handler.apply(this, args));
  }, options);
}; // Make the above available for packages with hooks that want to determine
// whether they are running inside a publish function or not.


CollectionHooks.isWithinPublish = () => publishUserId.get() !== undefined;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"advices.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/matb33_collection-hooks/advices.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.link("./insert.js");
module.link("./update.js");
module.link("./remove.js");
module.link("./upsert.js");
module.link("./find.js");
module.link("./findone.js");
module.link("./users-compat.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"collection-hooks.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/matb33_collection-hooks/collection-hooks.js                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let _objectWithoutProperties;

module.link("@babel/runtime/helpers/objectWithoutProperties", {
  default(v) {
    _objectWithoutProperties = v;
  }

}, 0);

let _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }

}, 1);
module.export({
  CollectionHooks: () => CollectionHooks
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 1);
let EJSON;
module.link("meteor/ejson", {
  EJSON(v) {
    EJSON = v;
  }

}, 2);
let LocalCollection;
module.link("meteor/minimongo", {
  LocalCollection(v) {
    LocalCollection = v;
  }

}, 3);
const advices = {};
const CollectionHooks = {
  defaults: {
    before: {
      insert: {},
      update: {},
      remove: {},
      upsert: {},
      find: {},
      findOne: {},
      all: {}
    },
    after: {
      insert: {},
      update: {},
      remove: {},
      find: {},
      findOne: {},
      all: {}
    },
    all: {
      insert: {},
      update: {},
      remove: {},
      find: {},
      findOne: {},
      all: {}
    }
  },
  directEnv: new Meteor.EnvironmentVariable(),

  directOp(func) {
    return this.directEnv.withValue(true, func);
  },

  hookedOp(func) {
    return this.directEnv.withValue(false, func);
  }

};

CollectionHooks.extendCollectionInstance = function extendCollectionInstance(self, constructor) {
  // Offer a public API to allow the user to define aspects
  // Example: collection.before.insert(func);
  ['before', 'after'].forEach(function (pointcut) {
    Object.entries(advices).forEach(function (_ref) {
      let [method, advice] = _ref;
      if (advice === 'upsert' && pointcut === 'after') return;

      Meteor._ensure(self, pointcut, method);

      Meteor._ensure(self, '_hookAspects', method);

      self._hookAspects[method][pointcut] = [];

      self[pointcut][method] = function (aspect, options) {
        const len = self._hookAspects[method][pointcut].push({
          aspect,
          options: CollectionHooks.initOptions(options, pointcut, method)
        });

        return {
          replace(aspect, options) {
            self._hookAspects[method][pointcut].splice(len - 1, 1, {
              aspect,
              options: CollectionHooks.initOptions(options, pointcut, method)
            });
          },

          remove() {
            self._hookAspects[method][pointcut].splice(len - 1, 1);
          }

        };
      };
    });
  }); // Offer a publicly accessible object to allow the user to define
  // collection-wide hook options.
  // Example: collection.hookOptions.after.update = {fetchPrevious: false};

  self.hookOptions = EJSON.clone(CollectionHooks.defaults); // Wrap mutator methods, letting the defined advice do the work

  Object.entries(advices).forEach(function (_ref2) {
    let [method, advice] = _ref2;
    const collection = Meteor.isClient || method === 'upsert' ? self : self._collection; // Store a reference to the original mutator method

    const _super = collection[method];

    Meteor._ensure(self, 'direct', method);

    self.direct[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return CollectionHooks.directOp(function () {
        return constructor.prototype[method].apply(self, args);
      });
    };

    collection[method] = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (CollectionHooks.directEnv.get() === true) {
        return _super.apply(collection, args);
      } // NOTE: should we decide to force `update` with `{upsert:true}` to use
      // the `upsert` hooks, this is what will accomplish it. It's important to
      // realize that Meteor won't distinguish between an `update` and an
      // `insert` though, so we'll end up with `after.update` getting called
      // even on an `insert`. That's why we've chosen to disable this for now.
      // if (method === "update" && Object(args[2]) === args[2] && args[2].upsert) {
      //   method = "upsert";
      //   advice = CollectionHooks.getAdvice(method);
      // }


      return advice.call(this, CollectionHooks.getUserId(), _super, self, method === 'upsert' ? {
        insert: self._hookAspects.insert || {},
        update: self._hookAspects.update || {},
        upsert: self._hookAspects.upsert || {}
      } : self._hookAspects[method] || {}, function (doc) {
        return typeof self._transform === 'function' ? function (d) {
          return self._transform(d || doc);
        } : function (d) {
          return d || doc;
        };
      }, args, false);
    };
  });
};

CollectionHooks.defineAdvice = (method, advice) => {
  advices[method] = advice;
};

CollectionHooks.getAdvice = method => advices[method];

CollectionHooks.initOptions = (options, pointcut, method) => CollectionHooks.extendOptions(CollectionHooks.defaults, options, pointcut, method);

CollectionHooks.extendOptions = (source, options, pointcut, method) => _objectSpread({}, options, {}, source.all.all, {}, source[pointcut].all, {}, source.all[method], {}, source[pointcut][method]);

CollectionHooks.getDocs = function getDocs(collection, selector, options) {
  const findOptions = {
    transform: null,
    reactive: false
  }; // added reactive: false

  /*
  // No "fetch" support at this time.
  if (!this._validators.fetchAllFields) {
    findOptions.fields = {};
    this._validators.fetch.forEach(function(fieldName) {
      findOptions.fields[fieldName] = 1;
    });
  }
  */
  // Bit of a magic condition here... only "update" passes options, so this is
  // only relevant to when update calls getDocs:

  if (options) {
    // This was added because in our case, we are potentially iterating over
    // multiple docs. If multi isn't enabled, force a limit (almost like
    // findOne), as the default for update without multi enabled is to affect
    // only the first matched document:
    if (!options.multi) {
      findOptions.limit = 1;
    }

    const {
      multi,
      upsert
    } = options,
          rest = _objectWithoutProperties(options, ["multi", "upsert"]);

    Object.assign(findOptions, rest);
  } // Unlike validators, we iterate over multiple docs, so use
  // find instead of findOne:


  return collection.find(selector, findOptions);
}; // This function normalizes the selector (converting it to an Object)


CollectionHooks.normalizeSelector = function (selector) {
  if (typeof selector === 'string' || selector && selector.constructor === Mongo.ObjectID) {
    return {
      _id: selector
    };
  } else {
    return selector;
  }
}; // This function contains a snippet of code pulled and modified from:
// ~/.meteor/packages/mongo-livedata/collection.js
// It's contained in these utility functions to make updates easier for us in
// case this code changes.


CollectionHooks.getFields = function getFields(mutator) {
  // compute modified fields
  const fields = []; // ====ADDED START=======================

  const operators = ['$addToSet', '$bit', '$currentDate', '$inc', '$max', '$min', '$pop', '$pull', '$pullAll', '$push', '$rename', '$set', '$unset']; // ====ADDED END=========================

  Object.entries(mutator).forEach(function (_ref3) {
    let [op, params] = _ref3;

    // ====ADDED START=======================
    if (operators.includes(op)) {
      // ====ADDED END=========================
      Object.keys(params).forEach(function (field) {
        // treat dotted fields as if they are replacing their
        // top-level part
        if (field.indexOf('.') !== -1) {
          field = field.substring(0, field.indexOf('.'));
        } // record the field we are trying to change


        if (!fields.includes(field)) {
          fields.push(field);
        }
      }); // ====ADDED START=======================
    } else {
      fields.push(op);
    } // ====ADDED END=========================

  });
  return fields;
};

CollectionHooks.reassignPrototype = function reassignPrototype(instance, constr) {
  const hasSetPrototypeOf = typeof Object.setPrototypeOf === 'function';
  constr = constr || Mongo.Collection; // __proto__ is not available in < IE11
  // Note: Assigning a prototype dynamically has performance implications

  if (hasSetPrototypeOf) {
    Object.setPrototypeOf(instance, constr.prototype);
  } else if (instance.__proto__) {
    // eslint-disable-line no-proto
    instance.__proto__ = constr.prototype; // eslint-disable-line no-proto
  }
};

CollectionHooks.wrapCollection = function wrapCollection(ns, as) {
  if (!as._CollectionConstructor) as._CollectionConstructor = as.Collection;
  if (!as._CollectionPrototype) as._CollectionPrototype = new as.Collection(null);
  const constructor = ns._NewCollectionContructor || as._CollectionConstructor;
  const proto = as._CollectionPrototype;

  ns.Collection = function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    const ret = constructor.apply(this, args);
    CollectionHooks.extendCollectionInstance(this, constructor);
    return ret;
  }; // Retain a reference to the new constructor to allow further wrapping.


  ns._NewCollectionContructor = ns.Collection;
  ns.Collection.prototype = proto;
  ns.Collection.prototype.constructor = ns.Collection;

  for (const prop of Object.keys(constructor)) {
    ns.Collection[prop] = constructor[prop];
  } // Meteor overrides the apply method which is copied from the constructor in the loop above. Replace it with the
  // default method which we need if we were to further wrap ns.Collection.


  ns.Collection.apply = Function.prototype.apply;
};

CollectionHooks.modify = LocalCollection._modify;

if (typeof Mongo !== 'undefined') {
  CollectionHooks.wrapCollection(Meteor, Mongo);
  CollectionHooks.wrapCollection(Mongo, Mongo);
} else {
  CollectionHooks.wrapCollection(Meteor, Meteor);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"find.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/matb33_collection-hooks/find.js                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let CollectionHooks;
module.link("./collection-hooks", {
  CollectionHooks(v) {
    CollectionHooks = v;
  }

}, 0);
CollectionHooks.defineAdvice('find', function (userId, _super, instance, aspects, getTransform, args, suppressAspects) {
  const ctx = {
    context: this,
    _super,
    args
  };
  const selector = CollectionHooks.normalizeSelector(instance._getFindSelector(args));

  const options = instance._getFindOptions(args);

  let abort; // before

  if (!suppressAspects) {
    aspects.before.forEach(o => {
      const r = o.aspect.call(ctx, userId, selector, options);
      if (r === false) abort = true;
    });
    if (abort) return instance.find(undefined);
  }

  const after = cursor => {
    if (!suppressAspects) {
      aspects.after.forEach(o => {
        o.aspect.call(ctx, userId, selector, options, cursor);
      });
    }
  };

  const ret = _super.call(this, selector, options);

  after(ret);
  return ret;
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"findone.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/matb33_collection-hooks/findone.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let CollectionHooks;
module.link("./collection-hooks", {
  CollectionHooks(v) {
    CollectionHooks = v;
  }

}, 0);
CollectionHooks.defineAdvice('findOne', function (userId, _super, instance, aspects, getTransform, args, suppressAspects) {
  const ctx = {
    context: this,
    _super,
    args
  };
  const selector = CollectionHooks.normalizeSelector(instance._getFindSelector(args));

  const options = instance._getFindOptions(args);

  let abort; // before

  if (!suppressAspects) {
    aspects.before.forEach(o => {
      const r = o.aspect.call(ctx, userId, selector, options);
      if (r === false) abort = true;
    });
    if (abort) return;
  }

  function after(doc) {
    if (!suppressAspects) {
      aspects.after.forEach(o => {
        o.aspect.call(ctx, userId, selector, options, doc);
      });
    }
  }

  const ret = _super.call(this, selector, options);

  after(ret);
  return ret;
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"insert.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/matb33_collection-hooks/insert.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }

}, 0);
let EJSON;
module.link("meteor/ejson", {
  EJSON(v) {
    EJSON = v;
  }

}, 0);
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 1);
let CollectionHooks;
module.link("./collection-hooks", {
  CollectionHooks(v) {
    CollectionHooks = v;
  }

}, 2);
CollectionHooks.defineAdvice('insert', function (userId, _super, instance, aspects, getTransform, args, suppressAspects) {
  const ctx = {
    context: this,
    _super,
    args
  };
  let [doc, callback] = args;
  const async = typeof callback === 'function';
  let abort;
  let ret; // before

  if (!suppressAspects) {
    try {
      aspects.before.forEach(o => {
        const r = o.aspect.call(_objectSpread({
          transform: getTransform(doc)
        }, ctx), userId, doc);
        if (r === false) abort = true;
      });
      if (abort) return;
    } catch (e) {
      if (async) return callback.call(this, e);
      throw e;
    }
  }

  const after = (id, err) => {
    if (id) {
      // In some cases (namely Meteor.users on Meteor 1.4+), the _id property
      // is a raw mongo _id object. We need to extract the _id from this object
      if (typeof id === 'object' && id.ops) {
        // If _str then collection is using Mongo.ObjectID as ids
        if (doc._id._str) {
          id = new Mongo.ObjectID(doc._id._str.toString());
        } else {
          id = id.ops && id.ops[0] && id.ops[0]._id;
        }
      }

      doc = EJSON.clone(doc);
      doc._id = id;
    }

    if (!suppressAspects) {
      const lctx = _objectSpread({
        transform: getTransform(doc),
        _id: id,
        err
      }, ctx);

      aspects.after.forEach(o => {
        o.aspect.call(lctx, userId, doc);
      });
    }

    return id;
  };

  if (async) {
    const wrappedCallback = function (err, obj) {
      after(obj && obj[0] && obj[0]._id || obj, err);

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return callback.call(this, err, obj, ...args);
    };

    return _super.call(this, doc, wrappedCallback);
  } else {
    ret = _super.call(this, doc, callback);
    return after(ret && ret[0] && ret[0]._id || ret);
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"remove.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/matb33_collection-hooks/remove.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }

}, 0);
let EJSON;
module.link("meteor/ejson", {
  EJSON(v) {
    EJSON = v;
  }

}, 0);
let CollectionHooks;
module.link("./collection-hooks", {
  CollectionHooks(v) {
    CollectionHooks = v;
  }

}, 1);

const isEmpty = a => !Array.isArray(a) || !a.length;

CollectionHooks.defineAdvice('remove', function (userId, _super, instance, aspects, getTransform, args, suppressAspects) {
  const ctx = {
    context: this,
    _super,
    args
  };
  const [selector, callback] = args;
  const async = typeof callback === 'function';
  let docs;
  let abort;
  const prev = [];

  if (!suppressAspects) {
    try {
      if (!isEmpty(aspects.before) || !isEmpty(aspects.after)) {
        docs = CollectionHooks.getDocs.call(this, instance, selector).fetch();
      } // copy originals for convenience for the 'after' pointcut


      if (!isEmpty(aspects.after)) {
        docs.forEach(doc => prev.push(EJSON.clone(doc)));
      } // before


      aspects.before.forEach(o => {
        docs.forEach(doc => {
          const r = o.aspect.call(_objectSpread({
            transform: getTransform(doc)
          }, ctx), userId, doc);
          if (r === false) abort = true;
        });
      });
      if (abort) return 0;
    } catch (e) {
      if (async) return callback.call(this, e);
      throw e;
    }
  }

  function after(err) {
    if (!suppressAspects) {
      aspects.after.forEach(o => {
        prev.forEach(doc => {
          o.aspect.call(_objectSpread({
            transform: getTransform(doc),
            err
          }, ctx), userId, doc);
        });
      });
    }
  }

  if (async) {
    const wrappedCallback = function (err) {
      after(err);

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return callback.call(this, err, ...args);
    };

    return _super.call(this, selector, wrappedCallback);
  } else {
    const result = _super.call(this, selector, callback);

    after();
    return result;
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"update.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/matb33_collection-hooks/update.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }

}, 0);
let EJSON;
module.link("meteor/ejson", {
  EJSON(v) {
    EJSON = v;
  }

}, 0);
let CollectionHooks;
module.link("./collection-hooks", {
  CollectionHooks(v) {
    CollectionHooks = v;
  }

}, 1);

const isEmpty = a => !Array.isArray(a) || !a.length;

CollectionHooks.defineAdvice('update', function (userId, _super, instance, aspects, getTransform, args, suppressAspects) {
  const ctx = {
    context: this,
    _super,
    args
  };
  let [selector, mutator, options, callback] = args;

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  const async = typeof callback === 'function';
  let docs;
  let docIds;
  let fields;
  let abort;
  const prev = {};

  if (!suppressAspects) {
    try {
      if (!isEmpty(aspects.before) || !isEmpty(aspects.after)) {
        fields = CollectionHooks.getFields(mutator);
        docs = CollectionHooks.getDocs.call(this, instance, selector, options).fetch();
        docIds = docs.map(doc => doc._id);
      } // copy originals for convenience for the 'after' pointcut


      if (!isEmpty(aspects.after)) {
        prev.mutator = EJSON.clone(mutator);
        prev.options = EJSON.clone(options);

        if (aspects.after.some(o => o.options.fetchPrevious !== false) && CollectionHooks.extendOptions(instance.hookOptions, {}, 'after', 'update').fetchPrevious !== false) {
          prev.docs = {};
          docs.forEach(doc => {
            prev.docs[doc._id] = EJSON.clone(doc);
          });
        }
      } // before


      aspects.before.forEach(function (o) {
        docs.forEach(function (doc) {
          const r = o.aspect.call(_objectSpread({
            transform: getTransform(doc)
          }, ctx), userId, doc, fields, mutator, options);
          if (r === false) abort = true;
        });
      });
      if (abort) return 0;
    } catch (e) {
      if (async) return callback.call(this, e);
      throw e;
    }
  }

  const after = (affected, err) => {
    if (!suppressAspects && !isEmpty(aspects.after)) {
      const fields = CollectionHooks.getFields(mutator);
      const docs = CollectionHooks.getDocs.call(this, instance, {
        _id: {
          $in: docIds
        }
      }, options).fetch();
      aspects.after.forEach(o => {
        docs.forEach(doc => {
          o.aspect.call(_objectSpread({
            transform: getTransform(doc),
            previous: prev.docs && prev.docs[doc._id],
            affected,
            err
          }, ctx), userId, doc, fields, prev.mutator, prev.options);
        });
      });
    }
  };

  if (async) {
    const wrappedCallback = function (err, affected) {
      after(affected, err);

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return callback.call(this, err, affected, ...args);
    };

    return _super.call(this, selector, mutator, options, wrappedCallback);
  } else {
    const affected = _super.call(this, selector, mutator, options, callback);

    after(affected);
    return affected;
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"upsert.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/matb33_collection-hooks/upsert.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }

}, 0);
let EJSON;
module.link("meteor/ejson", {
  EJSON(v) {
    EJSON = v;
  }

}, 0);
let CollectionHooks;
module.link("./collection-hooks", {
  CollectionHooks(v) {
    CollectionHooks = v;
  }

}, 1);

const isEmpty = a => !Array.isArray(a) || !a.length;

CollectionHooks.defineAdvice('upsert', function (userId, _super, instance, aspectGroup, getTransform, args, suppressAspects) {
  args[0] = CollectionHooks.normalizeSelector(instance._getFindSelector(args));
  const ctx = {
    context: this,
    _super,
    args
  };
  let [selector, mutator, options, callback] = args;

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  const async = typeof callback === 'function';
  let docs;
  let docIds;
  let abort;
  const prev = {};

  if (!suppressAspects) {
    if (!isEmpty(aspectGroup.upsert.before) || !isEmpty(aspectGroup.update.after)) {
      docs = CollectionHooks.getDocs.call(this, instance, selector, options).fetch();
      docIds = docs.map(doc => doc._id);
    } // copy originals for convenience for the 'after' pointcut


    if (!isEmpty(aspectGroup.update.after)) {
      if (aspectGroup.update.after.some(o => o.options.fetchPrevious !== false) && CollectionHooks.extendOptions(instance.hookOptions, {}, 'after', 'update').fetchPrevious !== false) {
        prev.mutator = EJSON.clone(mutator);
        prev.options = EJSON.clone(options);
        prev.docs = {};
        docs.forEach(doc => {
          prev.docs[doc._id] = EJSON.clone(doc);
        });
      }
    } // before


    aspectGroup.upsert.before.forEach(o => {
      const r = o.aspect.call(ctx, userId, selector, mutator, options);
      if (r === false) abort = true;
    });
    if (abort) return {
      numberAffected: 0
    };
  }

  const afterUpdate = (affected, err) => {
    if (!suppressAspects && !isEmpty(aspectGroup.update.after)) {
      const fields = CollectionHooks.getFields(mutator);
      const docs = CollectionHooks.getDocs.call(this, instance, {
        _id: {
          $in: docIds
        }
      }, options).fetch();
      aspectGroup.update.after.forEach(o => {
        docs.forEach(doc => {
          o.aspect.call(_objectSpread({
            transform: getTransform(doc),
            previous: prev.docs && prev.docs[doc._id],
            affected,
            err
          }, ctx), userId, doc, fields, prev.mutator, prev.options);
        });
      });
    }
  };

  const afterInsert = (_id, err) => {
    if (!suppressAspects && !isEmpty(aspectGroup.insert.after)) {
      const doc = CollectionHooks.getDocs.call(this, instance, {
        _id
      }, selector, {}).fetch()[0]; // 3rd argument passes empty object which causes magic logic to imply limit:1

      const lctx = _objectSpread({
        transform: getTransform(doc),
        _id,
        err
      }, ctx);

      aspectGroup.insert.after.forEach(o => {
        o.aspect.call(lctx, userId, doc);
      });
    }
  };

  if (async) {
    const wrappedCallback = function (err, ret) {
      if (err || ret && ret.insertedId) {
        // Send any errors to afterInsert
        afterInsert(ret.insertedId, err);
      } else {
        afterUpdate(ret && ret.numberAffected, err); // Note that err can never reach here
      }

      return CollectionHooks.hookedOp(function () {
        return callback.call(this, err, ret);
      });
    };

    return CollectionHooks.directOp(() => _super.call(this, selector, mutator, options, wrappedCallback));
  } else {
    const ret = CollectionHooks.directOp(() => _super.call(this, selector, mutator, options, callback));

    if (ret && ret.insertedId) {
      afterInsert(ret.insertedId);
    } else {
      afterUpdate(ret && ret.numberAffected);
    }

    return ret;
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"users-compat.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/matb33_collection-hooks/users-compat.js                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 1);
let CollectionHooks;
module.link("./collection-hooks", {
  CollectionHooks(v) {
    CollectionHooks = v;
  }

}, 2);

if (Meteor.users) {
  // If Meteor.users has been instantiated, attempt to re-assign its prototype:
  CollectionHooks.reassignPrototype(Meteor.users); // Next, give it the hook aspects:

  CollectionHooks.extendCollectionInstance(Meteor.users, Mongo.Collection);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/matb33:collection-hooks/server.js");

/* Exports */
Package._define("matb33:collection-hooks", exports, {
  CollectionHooks: CollectionHooks
});

})();

//# sourceURL=meteor://💻app/packages/matb33_collection-hooks.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvbWF0YjMzOmNvbGxlY3Rpb24taG9va3Mvc2VydmVyLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9tYXRiMzM6Y29sbGVjdGlvbi1ob29rcy9hZHZpY2VzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9tYXRiMzM6Y29sbGVjdGlvbi1ob29rcy9jb2xsZWN0aW9uLWhvb2tzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9tYXRiMzM6Y29sbGVjdGlvbi1ob29rcy9maW5kLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9tYXRiMzM6Y29sbGVjdGlvbi1ob29rcy9maW5kb25lLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9tYXRiMzM6Y29sbGVjdGlvbi1ob29rcy9pbnNlcnQuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL21hdGIzMzpjb2xsZWN0aW9uLWhvb2tzL3JlbW92ZS5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvbWF0YjMzOmNvbGxlY3Rpb24taG9va3MvdXBkYXRlLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9tYXRiMzM6Y29sbGVjdGlvbi1ob29rcy91cHNlcnQuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL21hdGIzMzpjb2xsZWN0aW9uLWhvb2tzL3VzZXJzLWNvbXBhdC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnQiLCJDb2xsZWN0aW9uSG9va3MiLCJNZXRlb3IiLCJsaW5rIiwidiIsInB1Ymxpc2hVc2VySWQiLCJFbnZpcm9ubWVudFZhcmlhYmxlIiwiZ2V0VXNlcklkIiwidXNlcklkIiwiZSIsImdldCIsImRlZmF1bHRVc2VySWQiLCJfcHVibGlzaCIsInB1Ymxpc2giLCJuYW1lIiwiaGFuZGxlciIsIm9wdGlvbnMiLCJjYWxsIiwiYXJncyIsIndpdGhWYWx1ZSIsImFwcGx5IiwiaXNXaXRoaW5QdWJsaXNoIiwidW5kZWZpbmVkIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiZGVmYXVsdCIsIl9vYmplY3RTcHJlYWQiLCJNb25nbyIsIkVKU09OIiwiTG9jYWxDb2xsZWN0aW9uIiwiYWR2aWNlcyIsImRlZmF1bHRzIiwiYmVmb3JlIiwiaW5zZXJ0IiwidXBkYXRlIiwicmVtb3ZlIiwidXBzZXJ0IiwiZmluZCIsImZpbmRPbmUiLCJhbGwiLCJhZnRlciIsImRpcmVjdEVudiIsImRpcmVjdE9wIiwiZnVuYyIsImhvb2tlZE9wIiwiZXh0ZW5kQ29sbGVjdGlvbkluc3RhbmNlIiwic2VsZiIsImNvbnN0cnVjdG9yIiwiZm9yRWFjaCIsInBvaW50Y3V0IiwiT2JqZWN0IiwiZW50cmllcyIsIm1ldGhvZCIsImFkdmljZSIsIl9lbnN1cmUiLCJfaG9va0FzcGVjdHMiLCJhc3BlY3QiLCJsZW4iLCJwdXNoIiwiaW5pdE9wdGlvbnMiLCJyZXBsYWNlIiwic3BsaWNlIiwiaG9va09wdGlvbnMiLCJjbG9uZSIsImNvbGxlY3Rpb24iLCJpc0NsaWVudCIsIl9jb2xsZWN0aW9uIiwiX3N1cGVyIiwiZGlyZWN0IiwicHJvdG90eXBlIiwiZG9jIiwiX3RyYW5zZm9ybSIsImQiLCJkZWZpbmVBZHZpY2UiLCJnZXRBZHZpY2UiLCJleHRlbmRPcHRpb25zIiwic291cmNlIiwiZ2V0RG9jcyIsInNlbGVjdG9yIiwiZmluZE9wdGlvbnMiLCJ0cmFuc2Zvcm0iLCJyZWFjdGl2ZSIsIm11bHRpIiwibGltaXQiLCJyZXN0IiwiYXNzaWduIiwibm9ybWFsaXplU2VsZWN0b3IiLCJPYmplY3RJRCIsIl9pZCIsImdldEZpZWxkcyIsIm11dGF0b3IiLCJmaWVsZHMiLCJvcGVyYXRvcnMiLCJvcCIsInBhcmFtcyIsImluY2x1ZGVzIiwia2V5cyIsImZpZWxkIiwiaW5kZXhPZiIsInN1YnN0cmluZyIsInJlYXNzaWduUHJvdG90eXBlIiwiaW5zdGFuY2UiLCJjb25zdHIiLCJoYXNTZXRQcm90b3R5cGVPZiIsInNldFByb3RvdHlwZU9mIiwiQ29sbGVjdGlvbiIsIl9fcHJvdG9fXyIsIndyYXBDb2xsZWN0aW9uIiwibnMiLCJhcyIsIl9Db2xsZWN0aW9uQ29uc3RydWN0b3IiLCJfQ29sbGVjdGlvblByb3RvdHlwZSIsIl9OZXdDb2xsZWN0aW9uQ29udHJ1Y3RvciIsInByb3RvIiwicmV0IiwicHJvcCIsIkZ1bmN0aW9uIiwibW9kaWZ5IiwiX21vZGlmeSIsImFzcGVjdHMiLCJnZXRUcmFuc2Zvcm0iLCJzdXBwcmVzc0FzcGVjdHMiLCJjdHgiLCJjb250ZXh0IiwiX2dldEZpbmRTZWxlY3RvciIsIl9nZXRGaW5kT3B0aW9ucyIsImFib3J0IiwibyIsInIiLCJjdXJzb3IiLCJjYWxsYmFjayIsImFzeW5jIiwiaWQiLCJlcnIiLCJvcHMiLCJfc3RyIiwidG9TdHJpbmciLCJsY3R4Iiwid3JhcHBlZENhbGxiYWNrIiwib2JqIiwiaXNFbXB0eSIsImEiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJkb2NzIiwicHJldiIsImZldGNoIiwicmVzdWx0IiwiZG9jSWRzIiwibWFwIiwic29tZSIsImZldGNoUHJldmlvdXMiLCJhZmZlY3RlZCIsIiRpbiIsInByZXZpb3VzIiwiYXNwZWN0R3JvdXAiLCJudW1iZXJBZmZlY3RlZCIsImFmdGVyVXBkYXRlIiwiYWZ0ZXJJbnNlcnQiLCJpbnNlcnRlZElkIiwidXNlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFBQ0MsaUJBQWUsRUFBQyxNQUFJQTtBQUFyQixDQUFkO0FBQXFELElBQUlDLE1BQUo7QUFBV0gsTUFBTSxDQUFDSSxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDRCxRQUFNLENBQUNFLENBQUQsRUFBRztBQUFDRixVQUFNLEdBQUNFLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0QsQ0FBbEQ7QUFBcUQsSUFBSUgsZUFBSjtBQUFvQkYsTUFBTSxDQUFDSSxJQUFQLENBQVksb0JBQVosRUFB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QUFNLENBQUM4SixLQUFYLEVBQWtCO0FBQ2hCO0FBQ0EvSixpQkFBZSxDQUFDa0csaUJBQWhCLENBQWtDakcsTUFBTSxDQUFDOEosS0FBekMsRUFGZ0IsQ0FJaEI7O0FBQ0EvSixpQkFBZSxDQUFDMkMsd0JBQWhCLENBQXlDMUMsTUFBTSxDQUFDOEosS0FBaEQsRUFBdUR0SSxLQUFLLENBQUM4RSxVQUE3RDtBQUNELEMiLCJmaWxlIjoiL3BhY2thZ2VzL21hdGIzM19jb2xsZWN0aW9uLWhvb2tzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcidcbmltcG9ydCB7IENvbGxlY3Rpb25Ib29rcyB9IGZyb20gJy4vY29sbGVjdGlvbi1ob29rcydcblxuaW1wb3J0ICcuL2FkdmljZXMnXG5cbmNvbnN0IHB1Ymxpc2hVc2VySWQgPSBuZXcgTWV0ZW9yLkVudmlyb25tZW50VmFyaWFibGUoKVxuXG5Db2xsZWN0aW9uSG9va3MuZ2V0VXNlcklkID0gZnVuY3Rpb24gZ2V0VXNlcklkICgpIHtcbiAgbGV0IHVzZXJJZFxuXG4gIHRyeSB7XG4gICAgLy8gV2lsbCB0aHJvdyBhbiBlcnJvciB1bmxlc3Mgd2l0aGluIG1ldGhvZCBjYWxsLlxuICAgIC8vIEF0dGVtcHQgdG8gcmVjb3ZlciBncmFjZWZ1bGx5IGJ5IGNhdGNoaW5nOlxuICAgIHVzZXJJZCA9IE1ldGVvci51c2VySWQgJiYgTWV0ZW9yLnVzZXJJZCgpXG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgaWYgKHVzZXJJZCA9PSBudWxsKSB7XG4gICAgLy8gR2V0IHRoZSB1c2VySWQgaWYgd2UgYXJlIGluIGEgcHVibGlzaCBmdW5jdGlvbi5cbiAgICB1c2VySWQgPSBwdWJsaXNoVXNlcklkLmdldCgpXG4gIH1cblxuICBpZiAodXNlcklkID09IG51bGwpIHtcbiAgICB1c2VySWQgPSBDb2xsZWN0aW9uSG9va3MuZGVmYXVsdFVzZXJJZFxuICB9XG5cbiAgcmV0dXJuIHVzZXJJZFxufVxuXG5jb25zdCBfcHVibGlzaCA9IE1ldGVvci5wdWJsaXNoXG5NZXRlb3IucHVibGlzaCA9IGZ1bmN0aW9uIChuYW1lLCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gIHJldHVybiBfcHVibGlzaC5jYWxsKHRoaXMsIG5hbWUsIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgcmVwZWF0ZWRseSBpbiBwdWJsaWNhdGlvbnNcbiAgICByZXR1cm4gcHVibGlzaFVzZXJJZC53aXRoVmFsdWUodGhpcyAmJiB0aGlzLnVzZXJJZCwgKCkgPT4gaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKSlcbiAgfSwgb3B0aW9ucylcbn1cblxuLy8gTWFrZSB0aGUgYWJvdmUgYXZhaWxhYmxlIGZvciBwYWNrYWdlcyB3aXRoIGhvb2tzIHRoYXQgd2FudCB0byBkZXRlcm1pbmVcbi8vIHdoZXRoZXIgdGhleSBhcmUgcnVubmluZyBpbnNpZGUgYSBwdWJsaXNoIGZ1bmN0aW9uIG9yIG5vdC5cbkNvbGxlY3Rpb25Ib29rcy5pc1dpdGhpblB1Ymxpc2ggPSAoKSA9PiBwdWJsaXNoVXNlcklkLmdldCgpICE9PSB1bmRlZmluZWRcblxuZXhwb3J0IHtcbiAgQ29sbGVjdGlvbkhvb2tzXG59XG4iLCJpbXBvcnQgJy4vaW5zZXJ0LmpzJ1xuaW1wb3J0ICcuL3VwZGF0ZS5qcydcbmltcG9ydCAnLi9yZW1vdmUuanMnXG5pbXBvcnQgJy4vdXBzZXJ0LmpzJ1xuaW1wb3J0ICcuL2ZpbmQuanMnXG5pbXBvcnQgJy4vZmluZG9uZS5qcydcblxuLy8gTG9hZCBhZnRlciBhbGwgYWR2aWNlcyBoYXZlIGJlZW4gZGVmaW5lZFxuaW1wb3J0ICcuL3VzZXJzLWNvbXBhdC5qcydcbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InXG5pbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbydcbmltcG9ydCB7IEVKU09OIH0gZnJvbSAnbWV0ZW9yL2Vqc29uJ1xuaW1wb3J0IHsgTG9jYWxDb2xsZWN0aW9uIH0gZnJvbSAnbWV0ZW9yL21pbmltb25nbydcblxuLy8gUmVsZXZhbnQgQU9QIHRlcm1pbm9sb2d5OlxuLy8gQXNwZWN0OiBVc2VyIGNvZGUgdGhhdCBydW5zIGJlZm9yZS9hZnRlciAoaG9vaylcbi8vIEFkdmljZTogV3JhcHBlciBjb2RlIHRoYXQga25vd3Mgd2hlbiB0byBjYWxsIHVzZXIgY29kZSAoYXNwZWN0cylcbi8vIFBvaW50Y3V0OiBiZWZvcmUvYWZ0ZXJcbmNvbnN0IGFkdmljZXMgPSB7fVxuXG5leHBvcnQgY29uc3QgQ29sbGVjdGlvbkhvb2tzID0ge1xuICBkZWZhdWx0czoge1xuICAgIGJlZm9yZTogeyBpbnNlcnQ6IHt9LCB1cGRhdGU6IHt9LCByZW1vdmU6IHt9LCB1cHNlcnQ6IHt9LCBmaW5kOiB7fSwgZmluZE9uZToge30sIGFsbDoge30gfSxcbiAgICBhZnRlcjogeyBpbnNlcnQ6IHt9LCB1cGRhdGU6IHt9LCByZW1vdmU6IHt9LCBmaW5kOiB7fSwgZmluZE9uZToge30sIGFsbDoge30gfSxcbiAgICBhbGw6IHsgaW5zZXJ0OiB7fSwgdXBkYXRlOiB7fSwgcmVtb3ZlOiB7fSwgZmluZDoge30sIGZpbmRPbmU6IHt9LCBhbGw6IHt9IH1cbiAgfSxcbiAgZGlyZWN0RW52OiBuZXcgTWV0ZW9yLkVudmlyb25tZW50VmFyaWFibGUoKSxcbiAgZGlyZWN0T3AgKGZ1bmMpIHtcbiAgICByZXR1cm4gdGhpcy5kaXJlY3RFbnYud2l0aFZhbHVlKHRydWUsIGZ1bmMpXG4gIH0sXG4gIGhvb2tlZE9wIChmdW5jKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlyZWN0RW52LndpdGhWYWx1ZShmYWxzZSwgZnVuYylcbiAgfVxufVxuXG5Db2xsZWN0aW9uSG9va3MuZXh0ZW5kQ29sbGVjdGlvbkluc3RhbmNlID0gZnVuY3Rpb24gZXh0ZW5kQ29sbGVjdGlvbkluc3RhbmNlIChzZWxmLCBjb25zdHJ1Y3Rvcikge1xuICAvLyBPZmZlciBhIHB1YmxpYyBBUEkgdG8gYWxsb3cgdGhlIHVzZXIgdG8gZGVmaW5lIGFzcGVjdHNcbiAgLy8gRXhhbXBsZTogY29sbGVjdGlvbi5iZWZvcmUuaW5zZXJ0KGZ1bmMpO1xuICBbJ2JlZm9yZScsICdhZnRlciddLmZvckVhY2goZnVuY3Rpb24gKHBvaW50Y3V0KSB7XG4gICAgT2JqZWN0LmVudHJpZXMoYWR2aWNlcykuZm9yRWFjaChmdW5jdGlvbiAoW21ldGhvZCwgYWR2aWNlXSkge1xuICAgICAgaWYgKGFkdmljZSA9PT0gJ3Vwc2VydCcgJiYgcG9pbnRjdXQgPT09ICdhZnRlcicpIHJldHVyblxuXG4gICAgICBNZXRlb3IuX2Vuc3VyZShzZWxmLCBwb2ludGN1dCwgbWV0aG9kKVxuICAgICAgTWV0ZW9yLl9lbnN1cmUoc2VsZiwgJ19ob29rQXNwZWN0cycsIG1ldGhvZClcblxuICAgICAgc2VsZi5faG9va0FzcGVjdHNbbWV0aG9kXVtwb2ludGN1dF0gPSBbXVxuICAgICAgc2VsZltwb2ludGN1dF1bbWV0aG9kXSA9IGZ1bmN0aW9uIChhc3BlY3QsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgbGVuID0gc2VsZi5faG9va0FzcGVjdHNbbWV0aG9kXVtwb2ludGN1dF0ucHVzaCh7XG4gICAgICAgICAgYXNwZWN0LFxuICAgICAgICAgIG9wdGlvbnM6IENvbGxlY3Rpb25Ib29rcy5pbml0T3B0aW9ucyhvcHRpb25zLCBwb2ludGN1dCwgbWV0aG9kKVxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmVwbGFjZSAoYXNwZWN0LCBvcHRpb25zKSB7XG4gICAgICAgICAgICBzZWxmLl9ob29rQXNwZWN0c1ttZXRob2RdW3BvaW50Y3V0XS5zcGxpY2UobGVuIC0gMSwgMSwge1xuICAgICAgICAgICAgICBhc3BlY3QsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IENvbGxlY3Rpb25Ib29rcy5pbml0T3B0aW9ucyhvcHRpb25zLCBwb2ludGN1dCwgbWV0aG9kKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlbW92ZSAoKSB7XG4gICAgICAgICAgICBzZWxmLl9ob29rQXNwZWN0c1ttZXRob2RdW3BvaW50Y3V0XS5zcGxpY2UobGVuIC0gMSwgMSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIC8vIE9mZmVyIGEgcHVibGljbHkgYWNjZXNzaWJsZSBvYmplY3QgdG8gYWxsb3cgdGhlIHVzZXIgdG8gZGVmaW5lXG4gIC8vIGNvbGxlY3Rpb24td2lkZSBob29rIG9wdGlvbnMuXG4gIC8vIEV4YW1wbGU6IGNvbGxlY3Rpb24uaG9va09wdGlvbnMuYWZ0ZXIudXBkYXRlID0ge2ZldGNoUHJldmlvdXM6IGZhbHNlfTtcbiAgc2VsZi5ob29rT3B0aW9ucyA9IEVKU09OLmNsb25lKENvbGxlY3Rpb25Ib29rcy5kZWZhdWx0cylcblxuICAvLyBXcmFwIG11dGF0b3IgbWV0aG9kcywgbGV0dGluZyB0aGUgZGVmaW5lZCBhZHZpY2UgZG8gdGhlIHdvcmtcbiAgT2JqZWN0LmVudHJpZXMoYWR2aWNlcykuZm9yRWFjaChmdW5jdGlvbiAoW21ldGhvZCwgYWR2aWNlXSkge1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBNZXRlb3IuaXNDbGllbnQgfHwgbWV0aG9kID09PSAndXBzZXJ0JyA/IHNlbGYgOiBzZWxmLl9jb2xsZWN0aW9uXG5cbiAgICAvLyBTdG9yZSBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgbXV0YXRvciBtZXRob2RcbiAgICBjb25zdCBfc3VwZXIgPSBjb2xsZWN0aW9uW21ldGhvZF1cblxuICAgIE1ldGVvci5fZW5zdXJlKHNlbGYsICdkaXJlY3QnLCBtZXRob2QpXG4gICAgc2VsZi5kaXJlY3RbbWV0aG9kXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICByZXR1cm4gQ29sbGVjdGlvbkhvb2tzLmRpcmVjdE9wKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2RdLmFwcGx5KHNlbGYsIGFyZ3MpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbGxlY3Rpb25bbWV0aG9kXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICBpZiAoQ29sbGVjdGlvbkhvb2tzLmRpcmVjdEVudi5nZXQoKSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmFwcGx5KGNvbGxlY3Rpb24sIGFyZ3MpXG4gICAgICB9XG5cbiAgICAgIC8vIE5PVEU6IHNob3VsZCB3ZSBkZWNpZGUgdG8gZm9yY2UgYHVwZGF0ZWAgd2l0aCBge3Vwc2VydDp0cnVlfWAgdG8gdXNlXG4gICAgICAvLyB0aGUgYHVwc2VydGAgaG9va3MsIHRoaXMgaXMgd2hhdCB3aWxsIGFjY29tcGxpc2ggaXQuIEl0J3MgaW1wb3J0YW50IHRvXG4gICAgICAvLyByZWFsaXplIHRoYXQgTWV0ZW9yIHdvbid0IGRpc3Rpbmd1aXNoIGJldHdlZW4gYW4gYHVwZGF0ZWAgYW5kIGFuXG4gICAgICAvLyBgaW5zZXJ0YCB0aG91Z2gsIHNvIHdlJ2xsIGVuZCB1cCB3aXRoIGBhZnRlci51cGRhdGVgIGdldHRpbmcgY2FsbGVkXG4gICAgICAvLyBldmVuIG9uIGFuIGBpbnNlcnRgLiBUaGF0J3Mgd2h5IHdlJ3ZlIGNob3NlbiB0byBkaXNhYmxlIHRoaXMgZm9yIG5vdy5cbiAgICAgIC8vIGlmIChtZXRob2QgPT09IFwidXBkYXRlXCIgJiYgT2JqZWN0KGFyZ3NbMl0pID09PSBhcmdzWzJdICYmIGFyZ3NbMl0udXBzZXJ0KSB7XG4gICAgICAvLyAgIG1ldGhvZCA9IFwidXBzZXJ0XCI7XG4gICAgICAvLyAgIGFkdmljZSA9IENvbGxlY3Rpb25Ib29rcy5nZXRBZHZpY2UobWV0aG9kKTtcbiAgICAgIC8vIH1cblxuICAgICAgcmV0dXJuIGFkdmljZS5jYWxsKHRoaXMsXG4gICAgICAgIENvbGxlY3Rpb25Ib29rcy5nZXRVc2VySWQoKSxcbiAgICAgICAgX3N1cGVyLFxuICAgICAgICBzZWxmLFxuICAgICAgICBtZXRob2QgPT09ICd1cHNlcnQnID8ge1xuICAgICAgICAgIGluc2VydDogc2VsZi5faG9va0FzcGVjdHMuaW5zZXJ0IHx8IHt9LFxuICAgICAgICAgIHVwZGF0ZTogc2VsZi5faG9va0FzcGVjdHMudXBkYXRlIHx8IHt9LFxuICAgICAgICAgIHVwc2VydDogc2VsZi5faG9va0FzcGVjdHMudXBzZXJ0IHx8IHt9XG4gICAgICAgIH0gOiBzZWxmLl9ob29rQXNwZWN0c1ttZXRob2RdIHx8IHt9LFxuICAgICAgICBmdW5jdGlvbiAoZG9jKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHR5cGVvZiBzZWxmLl90cmFuc2Zvcm0gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgPyBmdW5jdGlvbiAoZCkgeyByZXR1cm4gc2VsZi5fdHJhbnNmb3JtKGQgfHwgZG9jKSB9XG4gICAgICAgICAgICAgIDogZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQgfHwgZG9jIH1cbiAgICAgICAgICApXG4gICAgICAgIH0sXG4gICAgICAgIGFyZ3MsXG4gICAgICAgIGZhbHNlXG4gICAgICApXG4gICAgfVxuICB9KVxufVxuXG5Db2xsZWN0aW9uSG9va3MuZGVmaW5lQWR2aWNlID0gKG1ldGhvZCwgYWR2aWNlKSA9PiB7XG4gIGFkdmljZXNbbWV0aG9kXSA9IGFkdmljZVxufVxuXG5Db2xsZWN0aW9uSG9va3MuZ2V0QWR2aWNlID0gbWV0aG9kID0+IGFkdmljZXNbbWV0aG9kXVxuXG5Db2xsZWN0aW9uSG9va3MuaW5pdE9wdGlvbnMgPSAob3B0aW9ucywgcG9pbnRjdXQsIG1ldGhvZCkgPT5cbiAgQ29sbGVjdGlvbkhvb2tzLmV4dGVuZE9wdGlvbnMoQ29sbGVjdGlvbkhvb2tzLmRlZmF1bHRzLCBvcHRpb25zLCBwb2ludGN1dCwgbWV0aG9kKVxuXG5Db2xsZWN0aW9uSG9va3MuZXh0ZW5kT3B0aW9ucyA9IChzb3VyY2UsIG9wdGlvbnMsIHBvaW50Y3V0LCBtZXRob2QpID0+XG4gICh7IC4uLm9wdGlvbnMsIC4uLnNvdXJjZS5hbGwuYWxsLCAuLi5zb3VyY2VbcG9pbnRjdXRdLmFsbCwgLi4uc291cmNlLmFsbFttZXRob2RdLCAuLi5zb3VyY2VbcG9pbnRjdXRdW21ldGhvZF0gfSlcblxuQ29sbGVjdGlvbkhvb2tzLmdldERvY3MgPSBmdW5jdGlvbiBnZXREb2NzIChjb2xsZWN0aW9uLCBzZWxlY3Rvciwgb3B0aW9ucykge1xuICBjb25zdCBmaW5kT3B0aW9ucyA9IHsgdHJhbnNmb3JtOiBudWxsLCByZWFjdGl2ZTogZmFsc2UgfSAvLyBhZGRlZCByZWFjdGl2ZTogZmFsc2VcblxuICAvKlxuICAvLyBObyBcImZldGNoXCIgc3VwcG9ydCBhdCB0aGlzIHRpbWUuXG4gIGlmICghdGhpcy5fdmFsaWRhdG9ycy5mZXRjaEFsbEZpZWxkcykge1xuICAgIGZpbmRPcHRpb25zLmZpZWxkcyA9IHt9O1xuICAgIHRoaXMuX3ZhbGlkYXRvcnMuZmV0Y2guZm9yRWFjaChmdW5jdGlvbihmaWVsZE5hbWUpIHtcbiAgICAgIGZpbmRPcHRpb25zLmZpZWxkc1tmaWVsZE5hbWVdID0gMTtcbiAgICB9KTtcbiAgfVxuICAqL1xuXG4gIC8vIEJpdCBvZiBhIG1hZ2ljIGNvbmRpdGlvbiBoZXJlLi4uIG9ubHkgXCJ1cGRhdGVcIiBwYXNzZXMgb3B0aW9ucywgc28gdGhpcyBpc1xuICAvLyBvbmx5IHJlbGV2YW50IHRvIHdoZW4gdXBkYXRlIGNhbGxzIGdldERvY3M6XG4gIGlmIChvcHRpb25zKSB7XG4gICAgLy8gVGhpcyB3YXMgYWRkZWQgYmVjYXVzZSBpbiBvdXIgY2FzZSwgd2UgYXJlIHBvdGVudGlhbGx5IGl0ZXJhdGluZyBvdmVyXG4gICAgLy8gbXVsdGlwbGUgZG9jcy4gSWYgbXVsdGkgaXNuJ3QgZW5hYmxlZCwgZm9yY2UgYSBsaW1pdCAoYWxtb3N0IGxpa2VcbiAgICAvLyBmaW5kT25lKSwgYXMgdGhlIGRlZmF1bHQgZm9yIHVwZGF0ZSB3aXRob3V0IG11bHRpIGVuYWJsZWQgaXMgdG8gYWZmZWN0XG4gICAgLy8gb25seSB0aGUgZmlyc3QgbWF0Y2hlZCBkb2N1bWVudDpcbiAgICBpZiAoIW9wdGlvbnMubXVsdGkpIHtcbiAgICAgIGZpbmRPcHRpb25zLmxpbWl0ID0gMVxuICAgIH1cbiAgICBjb25zdCB7IG11bHRpLCB1cHNlcnQsIC4uLnJlc3QgfSA9IG9wdGlvbnNcbiAgICBPYmplY3QuYXNzaWduKGZpbmRPcHRpb25zLCByZXN0KVxuICB9XG5cbiAgLy8gVW5saWtlIHZhbGlkYXRvcnMsIHdlIGl0ZXJhdGUgb3ZlciBtdWx0aXBsZSBkb2NzLCBzbyB1c2VcbiAgLy8gZmluZCBpbnN0ZWFkIG9mIGZpbmRPbmU6XG4gIHJldHVybiBjb2xsZWN0aW9uLmZpbmQoc2VsZWN0b3IsIGZpbmRPcHRpb25zKVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIG5vcm1hbGl6ZXMgdGhlIHNlbGVjdG9yIChjb252ZXJ0aW5nIGl0IHRvIGFuIE9iamVjdClcbkNvbGxlY3Rpb25Ib29rcy5ub3JtYWxpemVTZWxlY3RvciA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJyB8fCAoc2VsZWN0b3IgJiYgc2VsZWN0b3IuY29uc3RydWN0b3IgPT09IE1vbmdvLk9iamVjdElEKSkge1xuICAgIHJldHVybiB7XG4gICAgICBfaWQ6IHNlbGVjdG9yXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBzZWxlY3RvclxuICB9XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gY29udGFpbnMgYSBzbmlwcGV0IG9mIGNvZGUgcHVsbGVkIGFuZCBtb2RpZmllZCBmcm9tOlxuLy8gfi8ubWV0ZW9yL3BhY2thZ2VzL21vbmdvLWxpdmVkYXRhL2NvbGxlY3Rpb24uanNcbi8vIEl0J3MgY29udGFpbmVkIGluIHRoZXNlIHV0aWxpdHkgZnVuY3Rpb25zIHRvIG1ha2UgdXBkYXRlcyBlYXNpZXIgZm9yIHVzIGluXG4vLyBjYXNlIHRoaXMgY29kZSBjaGFuZ2VzLlxuQ29sbGVjdGlvbkhvb2tzLmdldEZpZWxkcyA9IGZ1bmN0aW9uIGdldEZpZWxkcyAobXV0YXRvcikge1xuICAvLyBjb21wdXRlIG1vZGlmaWVkIGZpZWxkc1xuICBjb25zdCBmaWVsZHMgPSBbXVxuICAvLyA9PT09QURERUQgU1RBUlQ9PT09PT09PT09PT09PT09PT09PT09PVxuICBjb25zdCBvcGVyYXRvcnMgPSBbXG4gICAgJyRhZGRUb1NldCcsXG4gICAgJyRiaXQnLFxuICAgICckY3VycmVudERhdGUnLFxuICAgICckaW5jJyxcbiAgICAnJG1heCcsXG4gICAgJyRtaW4nLFxuICAgICckcG9wJyxcbiAgICAnJHB1bGwnLFxuICAgICckcHVsbEFsbCcsXG4gICAgJyRwdXNoJyxcbiAgICAnJHJlbmFtZScsXG4gICAgJyRzZXQnLFxuICAgICckdW5zZXQnXG4gIF1cbiAgLy8gPT09PUFEREVEIEVORD09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBPYmplY3QuZW50cmllcyhtdXRhdG9yKS5mb3JFYWNoKGZ1bmN0aW9uIChbb3AsIHBhcmFtc10pIHtcbiAgICAvLyA9PT09QURERUQgU1RBUlQ9PT09PT09PT09PT09PT09PT09PT09PVxuICAgIGlmIChvcGVyYXRvcnMuaW5jbHVkZXMob3ApKSB7XG4gICAgLy8gPT09PUFEREVEIEVORD09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgLy8gdHJlYXQgZG90dGVkIGZpZWxkcyBhcyBpZiB0aGV5IGFyZSByZXBsYWNpbmcgdGhlaXJcbiAgICAgICAgLy8gdG9wLWxldmVsIHBhcnRcbiAgICAgICAgaWYgKGZpZWxkLmluZGV4T2YoJy4nKSAhPT0gLTEpIHtcbiAgICAgICAgICBmaWVsZCA9IGZpZWxkLnN1YnN0cmluZygwLCBmaWVsZC5pbmRleE9mKCcuJykpXG4gICAgICAgIH1cblxuICAgICAgICAvLyByZWNvcmQgdGhlIGZpZWxkIHdlIGFyZSB0cnlpbmcgdG8gY2hhbmdlXG4gICAgICAgIGlmICghZmllbGRzLmluY2x1ZGVzKGZpZWxkKSkge1xuICAgICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLy8gPT09PUFEREVEIFNUQVJUPT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB9IGVsc2Uge1xuICAgICAgZmllbGRzLnB1c2gob3ApXG4gICAgfVxuICAgIC8vID09PT1BRERFRCBFTkQ9PT09PT09PT09PT09PT09PT09PT09PT09XG4gIH0pXG5cbiAgcmV0dXJuIGZpZWxkc1xufVxuXG5Db2xsZWN0aW9uSG9va3MucmVhc3NpZ25Qcm90b3R5cGUgPSBmdW5jdGlvbiByZWFzc2lnblByb3RvdHlwZSAoaW5zdGFuY2UsIGNvbnN0cikge1xuICBjb25zdCBoYXNTZXRQcm90b3R5cGVPZiA9IHR5cGVvZiBPYmplY3Quc2V0UHJvdG90eXBlT2YgPT09ICdmdW5jdGlvbidcbiAgY29uc3RyID0gY29uc3RyIHx8IE1vbmdvLkNvbGxlY3Rpb25cblxuICAvLyBfX3Byb3RvX18gaXMgbm90IGF2YWlsYWJsZSBpbiA8IElFMTFcbiAgLy8gTm90ZTogQXNzaWduaW5nIGEgcHJvdG90eXBlIGR5bmFtaWNhbGx5IGhhcyBwZXJmb3JtYW5jZSBpbXBsaWNhdGlvbnNcbiAgaWYgKGhhc1NldFByb3RvdHlwZU9mKSB7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGluc3RhbmNlLCBjb25zdHIucHJvdG90eXBlKVxuICB9IGVsc2UgaWYgKGluc3RhbmNlLl9fcHJvdG9fXykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG4gICAgaW5zdGFuY2UuX19wcm90b19fID0gY29uc3RyLnByb3RvdHlwZSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG4gIH1cbn1cblxuQ29sbGVjdGlvbkhvb2tzLndyYXBDb2xsZWN0aW9uID0gZnVuY3Rpb24gd3JhcENvbGxlY3Rpb24gKG5zLCBhcykge1xuICBpZiAoIWFzLl9Db2xsZWN0aW9uQ29uc3RydWN0b3IpIGFzLl9Db2xsZWN0aW9uQ29uc3RydWN0b3IgPSBhcy5Db2xsZWN0aW9uXG4gIGlmICghYXMuX0NvbGxlY3Rpb25Qcm90b3R5cGUpIGFzLl9Db2xsZWN0aW9uUHJvdG90eXBlID0gbmV3IGFzLkNvbGxlY3Rpb24obnVsbClcblxuICBjb25zdCBjb25zdHJ1Y3RvciA9IG5zLl9OZXdDb2xsZWN0aW9uQ29udHJ1Y3RvciB8fCBhcy5fQ29sbGVjdGlvbkNvbnN0cnVjdG9yXG4gIGNvbnN0IHByb3RvID0gYXMuX0NvbGxlY3Rpb25Qcm90b3R5cGVcblxuICBucy5Db2xsZWN0aW9uID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zdCByZXQgPSBjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKVxuICAgIENvbGxlY3Rpb25Ib29rcy5leHRlbmRDb2xsZWN0aW9uSW5zdGFuY2UodGhpcywgY29uc3RydWN0b3IpXG4gICAgcmV0dXJuIHJldFxuICB9XG4gIC8vIFJldGFpbiBhIHJlZmVyZW5jZSB0byB0aGUgbmV3IGNvbnN0cnVjdG9yIHRvIGFsbG93IGZ1cnRoZXIgd3JhcHBpbmcuXG4gIG5zLl9OZXdDb2xsZWN0aW9uQ29udHJ1Y3RvciA9IG5zLkNvbGxlY3Rpb25cblxuICBucy5Db2xsZWN0aW9uLnByb3RvdHlwZSA9IHByb3RvXG4gIG5zLkNvbGxlY3Rpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gbnMuQ29sbGVjdGlvblxuXG4gIGZvciAoY29uc3QgcHJvcCBvZiBPYmplY3Qua2V5cyhjb25zdHJ1Y3RvcikpIHtcbiAgICBucy5Db2xsZWN0aW9uW3Byb3BdID0gY29uc3RydWN0b3JbcHJvcF1cbiAgfVxuXG4gIC8vIE1ldGVvciBvdmVycmlkZXMgdGhlIGFwcGx5IG1ldGhvZCB3aGljaCBpcyBjb3BpZWQgZnJvbSB0aGUgY29uc3RydWN0b3IgaW4gdGhlIGxvb3AgYWJvdmUuIFJlcGxhY2UgaXQgd2l0aCB0aGVcbiAgLy8gZGVmYXVsdCBtZXRob2Qgd2hpY2ggd2UgbmVlZCBpZiB3ZSB3ZXJlIHRvIGZ1cnRoZXIgd3JhcCBucy5Db2xsZWN0aW9uLlxuICBucy5Db2xsZWN0aW9uLmFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5XG59XG5cbkNvbGxlY3Rpb25Ib29rcy5tb2RpZnkgPSBMb2NhbENvbGxlY3Rpb24uX21vZGlmeVxuXG5pZiAodHlwZW9mIE1vbmdvICE9PSAndW5kZWZpbmVkJykge1xuICBDb2xsZWN0aW9uSG9va3Mud3JhcENvbGxlY3Rpb24oTWV0ZW9yLCBNb25nbylcbiAgQ29sbGVjdGlvbkhvb2tzLndyYXBDb2xsZWN0aW9uKE1vbmdvLCBNb25nbylcbn0gZWxzZSB7XG4gIENvbGxlY3Rpb25Ib29rcy53cmFwQ29sbGVjdGlvbihNZXRlb3IsIE1ldGVvcilcbn1cbiIsImltcG9ydCB7IENvbGxlY3Rpb25Ib29rcyB9IGZyb20gJy4vY29sbGVjdGlvbi1ob29rcydcblxuQ29sbGVjdGlvbkhvb2tzLmRlZmluZUFkdmljZSgnZmluZCcsIGZ1bmN0aW9uICh1c2VySWQsIF9zdXBlciwgaW5zdGFuY2UsIGFzcGVjdHMsIGdldFRyYW5zZm9ybSwgYXJncywgc3VwcHJlc3NBc3BlY3RzKSB7XG4gIGNvbnN0IGN0eCA9IHsgY29udGV4dDogdGhpcywgX3N1cGVyLCBhcmdzIH1cbiAgY29uc3Qgc2VsZWN0b3IgPSBDb2xsZWN0aW9uSG9va3Mubm9ybWFsaXplU2VsZWN0b3IoaW5zdGFuY2UuX2dldEZpbmRTZWxlY3RvcihhcmdzKSlcbiAgY29uc3Qgb3B0aW9ucyA9IGluc3RhbmNlLl9nZXRGaW5kT3B0aW9ucyhhcmdzKVxuICBsZXQgYWJvcnRcbiAgLy8gYmVmb3JlXG4gIGlmICghc3VwcHJlc3NBc3BlY3RzKSB7XG4gICAgYXNwZWN0cy5iZWZvcmUuZm9yRWFjaCgobykgPT4ge1xuICAgICAgY29uc3QgciA9IG8uYXNwZWN0LmNhbGwoY3R4LCB1c2VySWQsIHNlbGVjdG9yLCBvcHRpb25zKVxuICAgICAgaWYgKHIgPT09IGZhbHNlKSBhYm9ydCA9IHRydWVcbiAgICB9KVxuXG4gICAgaWYgKGFib3J0KSByZXR1cm4gaW5zdGFuY2UuZmluZCh1bmRlZmluZWQpXG4gIH1cblxuICBjb25zdCBhZnRlciA9IChjdXJzb3IpID0+IHtcbiAgICBpZiAoIXN1cHByZXNzQXNwZWN0cykge1xuICAgICAgYXNwZWN0cy5hZnRlci5mb3JFYWNoKChvKSA9PiB7XG4gICAgICAgIG8uYXNwZWN0LmNhbGwoY3R4LCB1c2VySWQsIHNlbGVjdG9yLCBvcHRpb25zLCBjdXJzb3IpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJldCA9IF9zdXBlci5jYWxsKHRoaXMsIHNlbGVjdG9yLCBvcHRpb25zKVxuICBhZnRlcihyZXQpXG5cbiAgcmV0dXJuIHJldFxufSlcbiIsImltcG9ydCB7IENvbGxlY3Rpb25Ib29rcyB9IGZyb20gJy4vY29sbGVjdGlvbi1ob29rcydcblxuQ29sbGVjdGlvbkhvb2tzLmRlZmluZUFkdmljZSgnZmluZE9uZScsIGZ1bmN0aW9uICh1c2VySWQsIF9zdXBlciwgaW5zdGFuY2UsIGFzcGVjdHMsIGdldFRyYW5zZm9ybSwgYXJncywgc3VwcHJlc3NBc3BlY3RzKSB7XG4gIGNvbnN0IGN0eCA9IHsgY29udGV4dDogdGhpcywgX3N1cGVyLCBhcmdzIH1cbiAgY29uc3Qgc2VsZWN0b3IgPSBDb2xsZWN0aW9uSG9va3Mubm9ybWFsaXplU2VsZWN0b3IoaW5zdGFuY2UuX2dldEZpbmRTZWxlY3RvcihhcmdzKSlcbiAgY29uc3Qgb3B0aW9ucyA9IGluc3RhbmNlLl9nZXRGaW5kT3B0aW9ucyhhcmdzKVxuICBsZXQgYWJvcnRcblxuICAvLyBiZWZvcmVcbiAgaWYgKCFzdXBwcmVzc0FzcGVjdHMpIHtcbiAgICBhc3BlY3RzLmJlZm9yZS5mb3JFYWNoKChvKSA9PiB7XG4gICAgICBjb25zdCByID0gby5hc3BlY3QuY2FsbChjdHgsIHVzZXJJZCwgc2VsZWN0b3IsIG9wdGlvbnMpXG4gICAgICBpZiAociA9PT0gZmFsc2UpIGFib3J0ID0gdHJ1ZVxuICAgIH0pXG5cbiAgICBpZiAoYWJvcnQpIHJldHVyblxuICB9XG5cbiAgZnVuY3Rpb24gYWZ0ZXIgKGRvYykge1xuICAgIGlmICghc3VwcHJlc3NBc3BlY3RzKSB7XG4gICAgICBhc3BlY3RzLmFmdGVyLmZvckVhY2goKG8pID0+IHtcbiAgICAgICAgby5hc3BlY3QuY2FsbChjdHgsIHVzZXJJZCwgc2VsZWN0b3IsIG9wdGlvbnMsIGRvYylcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmV0ID0gX3N1cGVyLmNhbGwodGhpcywgc2VsZWN0b3IsIG9wdGlvbnMpXG4gIGFmdGVyKHJldClcblxuICByZXR1cm4gcmV0XG59KVxuIiwiaW1wb3J0IHsgRUpTT04gfSBmcm9tICdtZXRlb3IvZWpzb24nXG5pbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbydcbmltcG9ydCB7IENvbGxlY3Rpb25Ib29rcyB9IGZyb20gJy4vY29sbGVjdGlvbi1ob29rcydcblxuQ29sbGVjdGlvbkhvb2tzLmRlZmluZUFkdmljZSgnaW5zZXJ0JywgZnVuY3Rpb24gKHVzZXJJZCwgX3N1cGVyLCBpbnN0YW5jZSwgYXNwZWN0cywgZ2V0VHJhbnNmb3JtLCBhcmdzLCBzdXBwcmVzc0FzcGVjdHMpIHtcbiAgY29uc3QgY3R4ID0geyBjb250ZXh0OiB0aGlzLCBfc3VwZXIsIGFyZ3MgfVxuICBsZXQgW2RvYywgY2FsbGJhY2tdID0gYXJnc1xuICBjb25zdCBhc3luYyA9IHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJ1xuICBsZXQgYWJvcnRcbiAgbGV0IHJldFxuXG4gIC8vIGJlZm9yZVxuICBpZiAoIXN1cHByZXNzQXNwZWN0cykge1xuICAgIHRyeSB7XG4gICAgICBhc3BlY3RzLmJlZm9yZS5mb3JFYWNoKChvKSA9PiB7XG4gICAgICAgIGNvbnN0IHIgPSBvLmFzcGVjdC5jYWxsKHsgdHJhbnNmb3JtOiBnZXRUcmFuc2Zvcm0oZG9jKSwgLi4uY3R4IH0sIHVzZXJJZCwgZG9jKVxuICAgICAgICBpZiAociA9PT0gZmFsc2UpIGFib3J0ID0gdHJ1ZVxuICAgICAgfSlcblxuICAgICAgaWYgKGFib3J0KSByZXR1cm5cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoYXN5bmMpIHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIGUpXG4gICAgICB0aHJvdyBlXG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWZ0ZXIgPSAoaWQsIGVycikgPT4ge1xuICAgIGlmIChpZCkge1xuICAgICAgLy8gSW4gc29tZSBjYXNlcyAobmFtZWx5IE1ldGVvci51c2VycyBvbiBNZXRlb3IgMS40KyksIHRoZSBfaWQgcHJvcGVydHlcbiAgICAgIC8vIGlzIGEgcmF3IG1vbmdvIF9pZCBvYmplY3QuIFdlIG5lZWQgdG8gZXh0cmFjdCB0aGUgX2lkIGZyb20gdGhpcyBvYmplY3RcbiAgICAgIGlmICh0eXBlb2YgaWQgPT09ICdvYmplY3QnICYmIGlkLm9wcykge1xuICAgICAgICAvLyBJZiBfc3RyIHRoZW4gY29sbGVjdGlvbiBpcyB1c2luZyBNb25nby5PYmplY3RJRCBhcyBpZHNcbiAgICAgICAgaWYgKGRvYy5faWQuX3N0cikge1xuICAgICAgICAgIGlkID0gbmV3IE1vbmdvLk9iamVjdElEKGRvYy5faWQuX3N0ci50b1N0cmluZygpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlkID0gaWQub3BzICYmIGlkLm9wc1swXSAmJiBpZC5vcHNbMF0uX2lkXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRvYyA9IEVKU09OLmNsb25lKGRvYylcbiAgICAgIGRvYy5faWQgPSBpZFxuICAgIH1cbiAgICBpZiAoIXN1cHByZXNzQXNwZWN0cykge1xuICAgICAgY29uc3QgbGN0eCA9IHsgdHJhbnNmb3JtOiBnZXRUcmFuc2Zvcm0oZG9jKSwgX2lkOiBpZCwgZXJyLCAuLi5jdHggfVxuICAgICAgYXNwZWN0cy5hZnRlci5mb3JFYWNoKChvKSA9PiB7XG4gICAgICAgIG8uYXNwZWN0LmNhbGwobGN0eCwgdXNlcklkLCBkb2MpXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gaWRcbiAgfVxuXG4gIGlmIChhc3luYykge1xuICAgIGNvbnN0IHdyYXBwZWRDYWxsYmFjayA9IGZ1bmN0aW9uIChlcnIsIG9iaiwgLi4uYXJncykge1xuICAgICAgYWZ0ZXIoKG9iaiAmJiBvYmpbMF0gJiYgb2JqWzBdLl9pZCkgfHwgb2JqLCBlcnIpXG4gICAgICByZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzLCBlcnIsIG9iaiwgLi4uYXJncylcbiAgICB9XG4gICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIGRvYywgd3JhcHBlZENhbGxiYWNrKVxuICB9IGVsc2Uge1xuICAgIHJldCA9IF9zdXBlci5jYWxsKHRoaXMsIGRvYywgY2FsbGJhY2spXG4gICAgcmV0dXJuIGFmdGVyKChyZXQgJiYgcmV0WzBdICYmIHJldFswXS5faWQpIHx8IHJldClcbiAgfVxufSlcbiIsImltcG9ydCB7IEVKU09OIH0gZnJvbSAnbWV0ZW9yL2Vqc29uJ1xuaW1wb3J0IHsgQ29sbGVjdGlvbkhvb2tzIH0gZnJvbSAnLi9jb2xsZWN0aW9uLWhvb2tzJ1xuXG5jb25zdCBpc0VtcHR5ID0gYSA9PiAhQXJyYXkuaXNBcnJheShhKSB8fCAhYS5sZW5ndGhcblxuQ29sbGVjdGlvbkhvb2tzLmRlZmluZUFkdmljZSgncmVtb3ZlJywgZnVuY3Rpb24gKHVzZXJJZCwgX3N1cGVyLCBpbnN0YW5jZSwgYXNwZWN0cywgZ2V0VHJhbnNmb3JtLCBhcmdzLCBzdXBwcmVzc0FzcGVjdHMpIHtcbiAgY29uc3QgY3R4ID0geyBjb250ZXh0OiB0aGlzLCBfc3VwZXIsIGFyZ3MgfVxuICBjb25zdCBbc2VsZWN0b3IsIGNhbGxiYWNrXSA9IGFyZ3NcbiAgY29uc3QgYXN5bmMgPSB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbidcbiAgbGV0IGRvY3NcbiAgbGV0IGFib3J0XG4gIGNvbnN0IHByZXYgPSBbXVxuXG4gIGlmICghc3VwcHJlc3NBc3BlY3RzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghaXNFbXB0eShhc3BlY3RzLmJlZm9yZSkgfHwgIWlzRW1wdHkoYXNwZWN0cy5hZnRlcikpIHtcbiAgICAgICAgZG9jcyA9IENvbGxlY3Rpb25Ib29rcy5nZXREb2NzLmNhbGwodGhpcywgaW5zdGFuY2UsIHNlbGVjdG9yKS5mZXRjaCgpXG4gICAgICB9XG5cbiAgICAgIC8vIGNvcHkgb3JpZ2luYWxzIGZvciBjb252ZW5pZW5jZSBmb3IgdGhlICdhZnRlcicgcG9pbnRjdXRcbiAgICAgIGlmICghaXNFbXB0eShhc3BlY3RzLmFmdGVyKSkge1xuICAgICAgICBkb2NzLmZvckVhY2goZG9jID0+IHByZXYucHVzaChFSlNPTi5jbG9uZShkb2MpKSlcbiAgICAgIH1cblxuICAgICAgLy8gYmVmb3JlXG4gICAgICBhc3BlY3RzLmJlZm9yZS5mb3JFYWNoKChvKSA9PiB7XG4gICAgICAgIGRvY3MuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgICAgY29uc3QgciA9IG8uYXNwZWN0LmNhbGwoeyB0cmFuc2Zvcm06IGdldFRyYW5zZm9ybShkb2MpLCAuLi5jdHggfSwgdXNlcklkLCBkb2MpXG4gICAgICAgICAgaWYgKHIgPT09IGZhbHNlKSBhYm9ydCA9IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAgIGlmIChhYm9ydCkgcmV0dXJuIDBcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoYXN5bmMpIHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIGUpXG4gICAgICB0aHJvdyBlXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWZ0ZXIgKGVycikge1xuICAgIGlmICghc3VwcHJlc3NBc3BlY3RzKSB7XG4gICAgICBhc3BlY3RzLmFmdGVyLmZvckVhY2goKG8pID0+IHtcbiAgICAgICAgcHJldi5mb3JFYWNoKChkb2MpID0+IHtcbiAgICAgICAgICBvLmFzcGVjdC5jYWxsKHsgdHJhbnNmb3JtOiBnZXRUcmFuc2Zvcm0oZG9jKSwgZXJyLCAuLi5jdHggfSwgdXNlcklkLCBkb2MpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGlmIChhc3luYykge1xuICAgIGNvbnN0IHdyYXBwZWRDYWxsYmFjayA9IGZ1bmN0aW9uIChlcnIsIC4uLmFyZ3MpIHtcbiAgICAgIGFmdGVyKGVycilcbiAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIGVyciwgLi4uYXJncylcbiAgICB9XG4gICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIHNlbGVjdG9yLCB3cmFwcGVkQ2FsbGJhY2spXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gX3N1cGVyLmNhbGwodGhpcywgc2VsZWN0b3IsIGNhbGxiYWNrKVxuICAgIGFmdGVyKClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBFSlNPTiB9IGZyb20gJ21ldGVvci9lanNvbidcbmltcG9ydCB7IENvbGxlY3Rpb25Ib29rcyB9IGZyb20gJy4vY29sbGVjdGlvbi1ob29rcydcblxuY29uc3QgaXNFbXB0eSA9IGEgPT4gIUFycmF5LmlzQXJyYXkoYSkgfHwgIWEubGVuZ3RoXG5cbkNvbGxlY3Rpb25Ib29rcy5kZWZpbmVBZHZpY2UoJ3VwZGF0ZScsIGZ1bmN0aW9uICh1c2VySWQsIF9zdXBlciwgaW5zdGFuY2UsIGFzcGVjdHMsIGdldFRyYW5zZm9ybSwgYXJncywgc3VwcHJlc3NBc3BlY3RzKSB7XG4gIGNvbnN0IGN0eCA9IHsgY29udGV4dDogdGhpcywgX3N1cGVyLCBhcmdzIH1cbiAgbGV0IFtzZWxlY3RvciwgbXV0YXRvciwgb3B0aW9ucywgY2FsbGJhY2tdID0gYXJnc1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfVxuICBjb25zdCBhc3luYyA9IHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJ1xuICBsZXQgZG9jc1xuICBsZXQgZG9jSWRzXG4gIGxldCBmaWVsZHNcbiAgbGV0IGFib3J0XG4gIGNvbnN0IHByZXYgPSB7fVxuXG4gIGlmICghc3VwcHJlc3NBc3BlY3RzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghaXNFbXB0eShhc3BlY3RzLmJlZm9yZSkgfHwgIWlzRW1wdHkoYXNwZWN0cy5hZnRlcikpIHtcbiAgICAgICAgZmllbGRzID0gQ29sbGVjdGlvbkhvb2tzLmdldEZpZWxkcyhtdXRhdG9yKVxuICAgICAgICBkb2NzID0gQ29sbGVjdGlvbkhvb2tzLmdldERvY3MuY2FsbCh0aGlzLCBpbnN0YW5jZSwgc2VsZWN0b3IsIG9wdGlvbnMpLmZldGNoKClcbiAgICAgICAgZG9jSWRzID0gZG9jcy5tYXAoZG9jID0+IGRvYy5faWQpXG4gICAgICB9XG5cbiAgICAgIC8vIGNvcHkgb3JpZ2luYWxzIGZvciBjb252ZW5pZW5jZSBmb3IgdGhlICdhZnRlcicgcG9pbnRjdXRcbiAgICAgIGlmICghaXNFbXB0eShhc3BlY3RzLmFmdGVyKSkge1xuICAgICAgICBwcmV2Lm11dGF0b3IgPSBFSlNPTi5jbG9uZShtdXRhdG9yKVxuICAgICAgICBwcmV2Lm9wdGlvbnMgPSBFSlNPTi5jbG9uZShvcHRpb25zKVxuICAgICAgICBpZiAoXG4gICAgICAgICAgYXNwZWN0cy5hZnRlci5zb21lKG8gPT4gby5vcHRpb25zLmZldGNoUHJldmlvdXMgIT09IGZhbHNlKSAmJlxuICAgICAgICAgIENvbGxlY3Rpb25Ib29rcy5leHRlbmRPcHRpb25zKGluc3RhbmNlLmhvb2tPcHRpb25zLCB7fSwgJ2FmdGVyJywgJ3VwZGF0ZScpLmZldGNoUHJldmlvdXMgIT09IGZhbHNlXG4gICAgICAgICkge1xuICAgICAgICAgIHByZXYuZG9jcyA9IHt9XG4gICAgICAgICAgZG9jcy5mb3JFYWNoKChkb2MpID0+IHtcbiAgICAgICAgICAgIHByZXYuZG9jc1tkb2MuX2lkXSA9IEVKU09OLmNsb25lKGRvYylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGJlZm9yZVxuICAgICAgYXNwZWN0cy5iZWZvcmUuZm9yRWFjaChmdW5jdGlvbiAobykge1xuICAgICAgICBkb2NzLmZvckVhY2goZnVuY3Rpb24gKGRvYykge1xuICAgICAgICAgIGNvbnN0IHIgPSBvLmFzcGVjdC5jYWxsKHsgdHJhbnNmb3JtOiBnZXRUcmFuc2Zvcm0oZG9jKSwgLi4uY3R4IH0sIHVzZXJJZCwgZG9jLCBmaWVsZHMsIG11dGF0b3IsIG9wdGlvbnMpXG4gICAgICAgICAgaWYgKHIgPT09IGZhbHNlKSBhYm9ydCA9IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAgIGlmIChhYm9ydCkgcmV0dXJuIDBcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoYXN5bmMpIHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIGUpXG4gICAgICB0aHJvdyBlXG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWZ0ZXIgPSAoYWZmZWN0ZWQsIGVycikgPT4ge1xuICAgIGlmICghc3VwcHJlc3NBc3BlY3RzICYmICFpc0VtcHR5KGFzcGVjdHMuYWZ0ZXIpKSB7XG4gICAgICBjb25zdCBmaWVsZHMgPSBDb2xsZWN0aW9uSG9va3MuZ2V0RmllbGRzKG11dGF0b3IpXG4gICAgICBjb25zdCBkb2NzID0gQ29sbGVjdGlvbkhvb2tzLmdldERvY3MuY2FsbCh0aGlzLCBpbnN0YW5jZSwgeyBfaWQ6IHsgJGluOiBkb2NJZHMgfSB9LCBvcHRpb25zKS5mZXRjaCgpXG5cbiAgICAgIGFzcGVjdHMuYWZ0ZXIuZm9yRWFjaCgobykgPT4ge1xuICAgICAgICBkb2NzLmZvckVhY2goKGRvYykgPT4ge1xuICAgICAgICAgIG8uYXNwZWN0LmNhbGwoe1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBnZXRUcmFuc2Zvcm0oZG9jKSxcbiAgICAgICAgICAgIHByZXZpb3VzOiBwcmV2LmRvY3MgJiYgcHJldi5kb2NzW2RvYy5faWRdLFxuICAgICAgICAgICAgYWZmZWN0ZWQsXG4gICAgICAgICAgICBlcnIsXG4gICAgICAgICAgICAuLi5jdHhcbiAgICAgICAgICB9LCB1c2VySWQsIGRvYywgZmllbGRzLCBwcmV2Lm11dGF0b3IsIHByZXYub3B0aW9ucylcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgaWYgKGFzeW5jKSB7XG4gICAgY29uc3Qgd3JhcHBlZENhbGxiYWNrID0gZnVuY3Rpb24gKGVyciwgYWZmZWN0ZWQsIC4uLmFyZ3MpIHtcbiAgICAgIGFmdGVyKGFmZmVjdGVkLCBlcnIpXG4gICAgICByZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzLCBlcnIsIGFmZmVjdGVkLCAuLi5hcmdzKVxuICAgIH1cbiAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgc2VsZWN0b3IsIG11dGF0b3IsIG9wdGlvbnMsIHdyYXBwZWRDYWxsYmFjaylcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBhZmZlY3RlZCA9IF9zdXBlci5jYWxsKHRoaXMsIHNlbGVjdG9yLCBtdXRhdG9yLCBvcHRpb25zLCBjYWxsYmFjaylcbiAgICBhZnRlcihhZmZlY3RlZClcbiAgICByZXR1cm4gYWZmZWN0ZWRcbiAgfVxufSlcbiIsImltcG9ydCB7IEVKU09OIH0gZnJvbSAnbWV0ZW9yL2Vqc29uJ1xuaW1wb3J0IHsgQ29sbGVjdGlvbkhvb2tzIH0gZnJvbSAnLi9jb2xsZWN0aW9uLWhvb2tzJ1xuXG5jb25zdCBpc0VtcHR5ID0gYSA9PiAhQXJyYXkuaXNBcnJheShhKSB8fCAhYS5sZW5ndGhcblxuQ29sbGVjdGlvbkhvb2tzLmRlZmluZUFkdmljZSgndXBzZXJ0JywgZnVuY3Rpb24gKHVzZXJJZCwgX3N1cGVyLCBpbnN0YW5jZSwgYXNwZWN0R3JvdXAsIGdldFRyYW5zZm9ybSwgYXJncywgc3VwcHJlc3NBc3BlY3RzKSB7XG4gIGFyZ3NbMF0gPSBDb2xsZWN0aW9uSG9va3Mubm9ybWFsaXplU2VsZWN0b3IoaW5zdGFuY2UuX2dldEZpbmRTZWxlY3RvcihhcmdzKSlcblxuICBjb25zdCBjdHggPSB7IGNvbnRleHQ6IHRoaXMsIF9zdXBlciwgYXJncyB9XG4gIGxldCBbc2VsZWN0b3IsIG11dGF0b3IsIG9wdGlvbnMsIGNhbGxiYWNrXSA9IGFyZ3NcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cblxuICBjb25zdCBhc3luYyA9IHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJ1xuICBsZXQgZG9jc1xuICBsZXQgZG9jSWRzXG4gIGxldCBhYm9ydFxuICBjb25zdCBwcmV2ID0ge31cblxuICBpZiAoIXN1cHByZXNzQXNwZWN0cykge1xuICAgIGlmICghaXNFbXB0eShhc3BlY3RHcm91cC51cHNlcnQuYmVmb3JlKSB8fCAhaXNFbXB0eShhc3BlY3RHcm91cC51cGRhdGUuYWZ0ZXIpKSB7XG4gICAgICBkb2NzID0gQ29sbGVjdGlvbkhvb2tzLmdldERvY3MuY2FsbCh0aGlzLCBpbnN0YW5jZSwgc2VsZWN0b3IsIG9wdGlvbnMpLmZldGNoKClcbiAgICAgIGRvY0lkcyA9IGRvY3MubWFwKGRvYyA9PiBkb2MuX2lkKVxuICAgIH1cblxuICAgIC8vIGNvcHkgb3JpZ2luYWxzIGZvciBjb252ZW5pZW5jZSBmb3IgdGhlICdhZnRlcicgcG9pbnRjdXRcbiAgICBpZiAoIWlzRW1wdHkoYXNwZWN0R3JvdXAudXBkYXRlLmFmdGVyKSkge1xuICAgICAgaWYgKGFzcGVjdEdyb3VwLnVwZGF0ZS5hZnRlci5zb21lKG8gPT4gby5vcHRpb25zLmZldGNoUHJldmlvdXMgIT09IGZhbHNlKSAmJlxuICAgICAgICBDb2xsZWN0aW9uSG9va3MuZXh0ZW5kT3B0aW9ucyhpbnN0YW5jZS5ob29rT3B0aW9ucywge30sICdhZnRlcicsICd1cGRhdGUnKS5mZXRjaFByZXZpb3VzICE9PSBmYWxzZSkge1xuICAgICAgICBwcmV2Lm11dGF0b3IgPSBFSlNPTi5jbG9uZShtdXRhdG9yKVxuICAgICAgICBwcmV2Lm9wdGlvbnMgPSBFSlNPTi5jbG9uZShvcHRpb25zKVxuXG4gICAgICAgIHByZXYuZG9jcyA9IHt9XG4gICAgICAgIGRvY3MuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgICAgcHJldi5kb2NzW2RvYy5faWRdID0gRUpTT04uY2xvbmUoZG9jKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGJlZm9yZVxuICAgIGFzcGVjdEdyb3VwLnVwc2VydC5iZWZvcmUuZm9yRWFjaCgobykgPT4ge1xuICAgICAgY29uc3QgciA9IG8uYXNwZWN0LmNhbGwoY3R4LCB1c2VySWQsIHNlbGVjdG9yLCBtdXRhdG9yLCBvcHRpb25zKVxuICAgICAgaWYgKHIgPT09IGZhbHNlKSBhYm9ydCA9IHRydWVcbiAgICB9KVxuXG4gICAgaWYgKGFib3J0KSByZXR1cm4geyBudW1iZXJBZmZlY3RlZDogMCB9XG4gIH1cblxuICBjb25zdCBhZnRlclVwZGF0ZSA9IChhZmZlY3RlZCwgZXJyKSA9PiB7XG4gICAgaWYgKCFzdXBwcmVzc0FzcGVjdHMgJiYgIWlzRW1wdHkoYXNwZWN0R3JvdXAudXBkYXRlLmFmdGVyKSkge1xuICAgICAgY29uc3QgZmllbGRzID0gQ29sbGVjdGlvbkhvb2tzLmdldEZpZWxkcyhtdXRhdG9yKVxuICAgICAgY29uc3QgZG9jcyA9IENvbGxlY3Rpb25Ib29rcy5nZXREb2NzLmNhbGwodGhpcywgaW5zdGFuY2UsIHsgX2lkOiB7ICRpbjogZG9jSWRzIH0gfSwgb3B0aW9ucykuZmV0Y2goKVxuXG4gICAgICBhc3BlY3RHcm91cC51cGRhdGUuYWZ0ZXIuZm9yRWFjaCgobykgPT4ge1xuICAgICAgICBkb2NzLmZvckVhY2goKGRvYykgPT4ge1xuICAgICAgICAgIG8uYXNwZWN0LmNhbGwoe1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBnZXRUcmFuc2Zvcm0oZG9jKSxcbiAgICAgICAgICAgIHByZXZpb3VzOiBwcmV2LmRvY3MgJiYgcHJldi5kb2NzW2RvYy5faWRdLFxuICAgICAgICAgICAgYWZmZWN0ZWQsXG4gICAgICAgICAgICBlcnIsXG4gICAgICAgICAgICAuLi5jdHhcbiAgICAgICAgICB9LCB1c2VySWQsIGRvYywgZmllbGRzLCBwcmV2Lm11dGF0b3IsIHByZXYub3B0aW9ucylcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWZ0ZXJJbnNlcnQgPSAoX2lkLCBlcnIpID0+IHtcbiAgICBpZiAoIXN1cHByZXNzQXNwZWN0cyAmJiAhaXNFbXB0eShhc3BlY3RHcm91cC5pbnNlcnQuYWZ0ZXIpKSB7XG4gICAgICBjb25zdCBkb2MgPSBDb2xsZWN0aW9uSG9va3MuZ2V0RG9jcy5jYWxsKHRoaXMsIGluc3RhbmNlLCB7IF9pZCB9LCBzZWxlY3Rvciwge30pLmZldGNoKClbMF0gLy8gM3JkIGFyZ3VtZW50IHBhc3NlcyBlbXB0eSBvYmplY3Qgd2hpY2ggY2F1c2VzIG1hZ2ljIGxvZ2ljIHRvIGltcGx5IGxpbWl0OjFcbiAgICAgIGNvbnN0IGxjdHggPSB7IHRyYW5zZm9ybTogZ2V0VHJhbnNmb3JtKGRvYyksIF9pZCwgZXJyLCAuLi5jdHggfVxuXG4gICAgICBhc3BlY3RHcm91cC5pbnNlcnQuYWZ0ZXIuZm9yRWFjaCgobykgPT4ge1xuICAgICAgICBvLmFzcGVjdC5jYWxsKGxjdHgsIHVzZXJJZCwgZG9jKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBpZiAoYXN5bmMpIHtcbiAgICBjb25zdCB3cmFwcGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoZXJyLCByZXQpIHtcbiAgICAgIGlmIChlcnIgfHwgKHJldCAmJiByZXQuaW5zZXJ0ZWRJZCkpIHtcbiAgICAgICAgLy8gU2VuZCBhbnkgZXJyb3JzIHRvIGFmdGVySW5zZXJ0XG4gICAgICAgIGFmdGVySW5zZXJ0KHJldC5pbnNlcnRlZElkLCBlcnIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZnRlclVwZGF0ZShyZXQgJiYgcmV0Lm51bWJlckFmZmVjdGVkLCBlcnIpIC8vIE5vdGUgdGhhdCBlcnIgY2FuIG5ldmVyIHJlYWNoIGhlcmVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbGxlY3Rpb25Ib29rcy5ob29rZWRPcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIGVyciwgcmV0KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gQ29sbGVjdGlvbkhvb2tzLmRpcmVjdE9wKCgpID0+IF9zdXBlci5jYWxsKHRoaXMsIHNlbGVjdG9yLCBtdXRhdG9yLCBvcHRpb25zLCB3cmFwcGVkQ2FsbGJhY2spKVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHJldCA9IENvbGxlY3Rpb25Ib29rcy5kaXJlY3RPcCgoKSA9PiBfc3VwZXIuY2FsbCh0aGlzLCBzZWxlY3RvciwgbXV0YXRvciwgb3B0aW9ucywgY2FsbGJhY2spKVxuXG4gICAgaWYgKHJldCAmJiByZXQuaW5zZXJ0ZWRJZCkge1xuICAgICAgYWZ0ZXJJbnNlcnQocmV0Lmluc2VydGVkSWQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFmdGVyVXBkYXRlKHJldCAmJiByZXQubnVtYmVyQWZmZWN0ZWQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHJldFxuICB9XG59KVxuIiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcidcbmltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJ1xuaW1wb3J0IHsgQ29sbGVjdGlvbkhvb2tzIH0gZnJvbSAnLi9jb2xsZWN0aW9uLWhvb2tzJ1xuXG5pZiAoTWV0ZW9yLnVzZXJzKSB7XG4gIC8vIElmIE1ldGVvci51c2VycyBoYXMgYmVlbiBpbnN0YW50aWF0ZWQsIGF0dGVtcHQgdG8gcmUtYXNzaWduIGl0cyBwcm90b3R5cGU6XG4gIENvbGxlY3Rpb25Ib29rcy5yZWFzc2lnblByb3RvdHlwZShNZXRlb3IudXNlcnMpXG5cbiAgLy8gTmV4dCwgZ2l2ZSBpdCB0aGUgaG9vayBhc3BlY3RzOlxuICBDb2xsZWN0aW9uSG9va3MuZXh0ZW5kQ29sbGVjdGlvbkluc3RhbmNlKE1ldGVvci51c2VycywgTW9uZ28uQ29sbGVjdGlvbilcbn1cbiJdfQ==
