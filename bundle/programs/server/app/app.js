var require = meteorInstall({"lib":{"i18n":{"en.i18n.json":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/i18n/en.i18n.json                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,
    package_name = "project",
    namespace = "project";

if (package_name != "project") {
    namespace = TAPi18n.packages[package_name].namespace;
}
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];
// integrate the fallback language translations 
translations = {};
translations[namespace] = {"error-message":"An error occurred : ","access-denied--page-title":"Access denied !","access-denied--login-needed":"You need to login first.","access-denied--login":"Log in","admin--page-title":"Administration","admin--spaces-list":"List of spaces","admin--spaces-title":"Title","admin--spaces-creation":"Date of creation","admin--spaces-owner":"Owner","admin--spaces-actions":"Actions","admin--spaces-open":"Open","admin--spaces-delete":"Delete","admin--users-list":"List of teacher accounts","admin--users-logins":"Login","admin--users-creation":"Date of creation","admin--users-last-connexion":"Last connection","admin--users-actions":"Actions","admin--users-change-password":"Change password","admin--users-delete":"Delete","admin--user-delete-message":"Permanently delete this user and its spaces ?","admin--user-delete-confirm-message":"The user has been deleted.","admin--change-password-message":"Enter a new password for the user:","admin--change-password-confirm-message":"The password has been changed.","layout--connection-status":"Disconnected","login--page-title":"Login","login--mail":"E-mail","login--password":"Password","login--send-mail-forgot-password-link":"Reset my password","login--button-submit":"Log in","login--register":"You do not have an account yet ?","login--register-contact-admin":"Please contact your Beekee Box administrator.","login--register-link":"Create an account","login--user-not-found":"Username does not exist.","login--incorrect-password":"Password does not match.","login--send-mail-forgot-password":"An email has been sent to % s with a link to reset your password.","login--send-mail-forgot-password-error":"An error has occurred. Please contact the administrator at : vincent.widmer@beekee.ch","login--send-mail-forgot-password-error-log":"Error sending an email to recover password : %s","logout--page-title":"Sign out","not-found--page-title":"Page not found","not-found--page-description":"Sorry, we can not find a page at this address.","not-found--go-back":"Return to home","privacy--page-title":"Privacy policy","privacy--content":"<h3> Teacher Account Information </h3> <p> When you create a teacher account, you must provide a valid email address and password. These details are not public and can be modified at any time. Beekee Live will not share this information with third parties. </p> <h3> Publications, photos, users </h3> <p> Beekee Live follows a strict data protection policy. The data published on Beekee Live are hosted on servers located in Switzerland. The Beekee Live platform is therefore subject to Swiss data protection law. Publications, photographs, user names and any other data published on the platform are the exclusive property of the user. At any time, a user may choose to permanently delete his/her data. In no event will Beekee Live transmit this data to third parties. </p> <h3> Intervention of a technician </h3> <p> On request of the user, a technician can access a space and consult the data stored on it in order to solve a technical problem. </p> <h3> Cookies </h3> <p> Like many websites, Beekee Live uses cookies to facilitate the use of the platform. The information contained in these cookies is not used by Beekee Live for any other purpose. </p>","register--page-title":"Create an account","register--mail":"E-mail","register--name":"Name","register--password":"Password","register--password-confirm":"Confirm password","register--password-dont-match":"Confirm password doesn't match.","register--terms":"By registering, you accept our <a href=\"{{pathFor 'privacy'}}\" target=\"_blank\">terms and conditions</a>.<br>Your e-mail address will not be disclosed to third parties.","register--button-submit":"Sign up","register--mail-exist":"There already exists a user account with this email address.","register--mail-no-valid-message":"Please enter a valid email address.","register--mail-subject":"Your registration on Beekee Live","register--mail-content":"<h2>Welcome to <a href=\"https://live.beekee.ch\">Beekee Live</a>!</h2><h3>We’re glad you’re here. Start teaching today by creating your first Beekee Live space!</h3><p><b>Tip</b> : Did you know that you can use Beekee Live on computer, smartphone or tablet without the need of installing an app?</p><p>The <a href=\"https://www.beekee.ch\">Beekee Team</a></p>","reset-password--page-title":"Reset your password","reset-password--new-password":"New password","reset-password--button-submit":"Save","register--password-changed-message":"The password has been changed.","space-edit-categories--page-title":"Manage categories","space-edit-categories--page-description":"The categories are used to classify posts.<br />Unlike tags, categories are defined in advance by the teacher.","space-edit-categories--confirm-delete":"Delete category","space-edit--button-submit-add-category":"Add","space-edit-categories--edit-category":"Edit category","space-edit--page-title":"Settings","space-edit--subtitle-general":"General","space-edit--list-title-change-code":"Change the access code","space-edit--description-change-code":"Share this code with your students so they can join this space.","space-edit--list-title-rename-space":"Rename this space","space-edit--list-title-delete-space":"Delete this space","space-edit--list-title-content":"Content","space-edit--list-title-flow":"Continuous Flow","space-edit--description-flow":"By enabling Continuous Flow, new publications are displayed in real time.","space-edit--list-title-categories":"Manage categories","space-edit--list-title-comments":"Allow comments","space-edit--subtitle-users":"Users","space-edit--list-title-users":"Manage authors","space-edit--list-title-free-users":"Free authors","space-edit--description-free-users":"By activating \"Free authors\", users are able to enter their username when they first log in. Otherwise, they will choose from an editable list under \"Manage authors\".","space-edit--subtitle-permissions":"Permissions","space-edit--select-permissions-own":"Authors can edit their own publications","space-edit--select-permissions-all":"Authors can edit all publications","space-edit--select-permissions-none":"Nobody can add or edit publications","space-edit--subtitle-box":"Box","space-edit--list-title-update-box":"Update the Box","space-edit--list-title-ip":"IP address :","space-edit--list-title-sync":"Synchronize with the cloud","space-edit--description-sync":"Connect the beekee box using an ethernet cable to sync its content with the cloud (www.beekee.ch). This may take several minutes.","space-edit--subtitle-account":"Your account","space-edit--description-change-password":"Change your account password.","space-edit--change-code-message":"Change the access code","space-edit--change-code-confirm-message":"The access code has been changed.","space-edit--change-code-already-used-message":"This code is already assigned to another space.","space-edit--rename-space-message":"Rename this space","space-edit--rename-space-confirm-message":"This space is now called","space-edit--delete-space-message":"Permanently delete this space and its contents ?","space-edit--delete-space-confirm-message":"The space has been removed.","space-edit--sync-login-message":"To synchronize this space with the cloud, you must have an account on www.beekee.ch.\nIf this is the case, enter the username linked to your account :","space-edit--sync-error-message":"A problem has occurred. Check that the box is connected to the internet and try again.","space-edit--update-message":"Updating of the box may make the platform inaccessible for several minutes.\nDo you want to continue ?","space-edit--update-waiting-message":"The box will be updated, please wait...","space-edit--no-ip":"No IP address","space-edit--not-connected":"Not connected","space-edit--module-resources":"Distribute files to your learners","space-edit--permissions-public-space":"Allows anyone to access the contents and interact within this Space without needing an Access Code","space-edit--permissions-add-categories":"Users can add categories","space-edit--permissions-add-resource":"Users can add resources","space-edit--permissions-add-posts":"Users can add posts","space-edit-authors---page-title":"Manage authors","space-edit-authors---page-description":"Author names are used to identify publications.<br>For example, add the name of your students or the name of a group.","space-edit-authors---submit-button":"Add","space-edit-authors--delete-author-message":"Delete the author %s ?","space-edit-authors--edit-author-message":"Modify the author :","space-edit-authors--add-author-error-message":"There is already an author with this name.","index-student--title":"The platform to promote real-time collaboration","index-student--wrapper-text":"A private space to share photos and messages <br> with your students, colleagues or friends.","index-student--code":"Private space","index-student--code-input-placeholder":"Enter an access code","index-student--visited-title":"Recently visited :","index-student--delete-recent":"(delete)","index-student--public-spaces-title":"Public spaces","index-student--button-code-link":"Validate","index-student--space-doesnt-exist-message":"This space does not exist.\nMake sure to respect the upper and lower case.","index-student--create-your-space-1":"Create","index-student--create-your-space-2":" your space in seconds for free!","index-student--privacy":"Privacy","index-student--about-us":"About us","index-teacher--spaces-title":"Your spaces","index-teacher--no-space":"You have not created a space yet.","index-teacher--button-submit-space":"Create a new space","index-teacher--shutdown":"Shutdown","index-teacher--shutdown-message":"Do you really want to shutdown the box ?","index-teacher--shutdown-confirm":"The box will shutdown in a few seconds...","update--reboot-confirm":"The box will reboot in a few seconds...","space-page--hide-panel":"Hide","space-page--code-panel-title":"Space's access code :","space-page--code-panel-description":"Spread this code for others to join you:","space-page--pinned-title":"Pinned","space-page--post-order":"Sort","space-page--post-order-asc":"Newest first","space-page--post-order-desc":"Older first","space-page--no-post":"There are no posts to display yet.","space-submit--page-title":"Create a space","space-submit--space-name":"Name of the space","space-submit--button-submit":"Create","space-submit--button-cancel":"Cancel","space-users--page-title":"Want to change your name ?","space-users-first-connection--page-title":"What is your name ?","space-users--page-description":"It will be used to identify your contributions","space-users--input-choose-author-placeholder":"Type a name...","space-users--submit-author":"Validate","space-users--user-exist":"The user %s already exists. Connect with this name ?","space-sidebar--home":"Home","space-sidebar--live-feed":"Live feed","space-sidebar--categories":"CATEGORIES","space-sidebar--add-category":"Add","space-sidebar--authors":"AUTHORS","space-sidebar--lessons":"Lessons","space-sidebar--resources":"Resources","space-submit--create-space":"Create a new space","space-submit--create-space-placeholer":"Space name","space-sidebar--create-own-space-1":"Create your own space","space-sidebar--create-own-space-2":"for free!","space-sidebar--privacy":"Privacy","space-sidebar--about-us":"About us","header--back":"Back","header--admin-access":"Teacher Access","header--register":"Create an account","header--login":"Log in","header--exit-message":"Leave this space ?","menu--show-all":"Show all","menu--favorites":"My favorites","menu--files":"Files","menu--images":"Images","menu--categories":"Categories","menu--authors":"Authors","menu--tags":"Keywords","menu--code":"Access code","post-edit--submit-button":"Edit","post-item--remove-pin":"Remove pin","post-item--add-pin":"Pin on top","post-item--remove-favorites":"Remove from my favorites","post-item--add-favorites":"Add to my favorites","post-item--delete-post-confirm":"Delete the post ?","post-item--delete-comment-confirm":"Delete the comment ?","post-submit--body-placeholder":"Say something...","post-submit--tags-placeholder":"Add Keywords...","post-submit--select-category":"Select a category","post-submit--no-category":"No category","post-submit--delete-image":"Delete the image","post-submit--confirm-delete-image":"Delete the image ?\nThis action is irreversible.","post-submit--confirm-delete-file":"Delete the file ?\nThis action is irreversible.","post-submit--submit-button":"Send","user-settings--page-title":"User settings","user-settings--confirm-logout":"Are you sure you want to sign out ?","user-settings--change-password":"Change password","user-settings--logout":"Sign out","user-settings--change-password-old-message":"Current Password :","user-settings--change-password-new-message":"New Password :","user-settings--change-password-confirm-message":"Your Password has been changed.","space-header--leave":"Leave this space","space-header--settings":"Settings","post--edit":"Edit","post--delete":"Delete","home--title":"Home","home--space-code-message":"<strong>Bzz!</strong> Spread this code for others to join you:","home--submit-button":"Add a section","home-post--order-up":"Up","home-post--order-down":"Down","home-post-delete--title":"Delete this section","home-post-delete--confirm":"Delete this section ?","home-post-edit--title":"Edit section","home-post-submit--title":"Add a section","home-post-submit--placeholder":"Title of the section","home-post-submit--confirm-toast":"The new section has been added.","modal--close":"Close","modal--cancel":"Cancel","modal--delete":"Delete","modal--submit":"Submit","modal--save":"Save changes","lessons--title":"Lessons","lessons--subtitle":"Articulate Storyline materials","lessons--submit-button":"Add a lesson","lessons-post--start-lesson":"Start this lesson","lessons-post-submit--title":"Add a lesson","lessons-post-submit--title-placeholder":"Title of the lesson","lessons-post-submit--description-placeholder":"Description of the lesson","lessons-post-submit--help":"Lessons must be exported in HTML5 format within Storyline.<br>The resulting folder must be zipped before being uploaded, and the .zip file must have the same name as the zipped folder it contains.","lessons-post-submit--confirm-toast":"The new lesson has been added.","lessons-post-delete--confirm":"Do you want to delete this lesson ?","lessons-post-delete--title":"Delete this lesson","lessons-post-edit--title":"Edit lesson","lessons-upload--button":"Upload a Storyline lesson","resources--title":"Resources","resources-post-edit--title":"Edit resource","resources-post-submit--title":"Add a resource","resources-post-submit--title-placeholder":"Title of the resource","resources-post-submit--description-placeholder":"Description of the ressource","resources-post-submit--confirm-toast":"The new resource has been added.","resources--submit-button":"Add a resource","resources-category-edit--title":"Edit a category","resources-category-submit--title":"Add a category","resources-category-submit--placeholder":"Category name","live-feed--notification-panel":"new messages","live-feed--load-more":"Load more...","live-feed-category-edit--title":"Edit a category","live-feed-category-submit--title":"Add a category","live-feed-category-submit--placeholder":"Category name","live-feed-post-delete--delete-confirm":"Do you want to delete this post ?","live-feed-post-delete--title":"Delete this post","live-feed-post--add-comment":"Add a comment...","live-feed-post--nb-likes-with-me":"You and %s people","live-feed-post--like":"You like","live-feed-post--nb-likes":"people","live-feed-post-submit--add-category":"+ Add a category...","live-feed-post-edit--title":"Edit post","live-feed-delete-comment--title":"Delete comment","live-feed-delete-comment--subtitle":"Delete this comment?"};
TAPi18n._loadLangFileObject("en", translations);
TAPi18n._registerServerTranslator("en", namespace);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"fr-FR.i18n.json":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/i18n/fr-FR.i18n.json                                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,
    package_name = "project",
    namespace = "project";

if (package_name != "project") {
    namespace = TAPi18n.packages[package_name].namespace;
}
TAPi18n.languages_names["fr-FR"] = ["fr-FR","fr-FR"];
if(_.isUndefined(TAPi18n.translations["fr-FR"])) {
  TAPi18n.translations["fr-FR"] = {};
}

if(_.isUndefined(TAPi18n.translations["fr-FR"][namespace])) {
  TAPi18n.translations["fr-FR"][namespace] = {};
}

_.extend(TAPi18n.translations["fr-FR"][namespace], {"error-message":"Une erreur est survenue : ","access-denied--page-title":"Accès refusé !","access-denied--login-needed":"Vous devez d'abord vous connecter","access-denied--login":"Se connecter","admin--page-title":"Administration","admin--spaces-list":"Liste des espaces","admin--spaces-title":"Titre","admin--spaces-creation":"Date de création","admin--spaces-owner":"Propriétaire","admin--spaces-actions":"Actions","admin--spaces-open":"Ouvrir","admin--spaces-delete":"Supprimer","admin--users-list":"Liste des comptes enseignants","admin--users-logins":"Identifiant","admin--users-creation":"Date de création","admin--users-last-connexion":"Dernière connexion","admin--users-actions":"Actions","admin--users-change-password":"Changer le mot de passe","admin--users-delete":"Supprimer","admin--user-delete-message":"Supprimer cet auteur et tous ces espaces ?","admin--user-delete-confirm-message":"L'utilisateur a été supprimé","admin--change-password-message":"Entrez un nouveau mot de passe pour l'utilisateur :","admin--change-password-confirm-message":"Le mot de passe a bien été changé.","layout--connection-status":"Déconnecté","login--page-title":"Accès enseignant","login--mail":"E-mail","login--password":"Mot de passe","login--send-mail-forgot-password-link":"Réinitialiser mon mot de passe","login--button-submit":"S'identifier","login--register":"Vous n'avez pas encore de compte ?","login--register-contact-admin":"Contactez l'administrateur de la Beekee Box.","login--register-link":"Créez un compte","login--user-not-found":"L'utilisateur n'existe pas.","login--incorrect-password":"Le mot de passe n'est pas correct.","login--send-mail-forgot-password":"Un e-mail a été envoyé à l'adresse %s comprenant un lien pour réinitialiser votre mot de passe.","login--send-mail-forgot-password-error":"Une erreur est survenue. Merci de contacter l'administrateur à l'adresse : vincent.widmer@beekee.ch","login--send-mail-forgot-password-error-log":"Erreur lors de l'envoi d'un e-mail pour récupérer un mot de passe : %s","logout--page-title":"Se déconnecter","not-found--page-title":"Page introuvable","not-found--page-description":"Désolé, nous ne pouvons pas trouver une page à cette adresse.","not-found--go-back":"Revenir à l'accueil","privacy--page-title":"Politique de confidentialité","privacy--content":"<h3>Informations sur les comptes enseignants</h3><p>Lorsque vous crééz un compte « enseignant », vous devez fournir une adresse e-mail valide ainsi qu’un mot de passe. Ces données ne sont pas publiques et peuvent être modifiées à tout moment. Beekee Live ne divulguera en aucun cas ces informations à des tiers.</p><h3>Publications, photos, utilisateurs</h3><p>Beekee Live suit une politique de protection des données stricte. Les données publiées sur Beekee Live sont hébergées sur des serveurs localisés en Suisse. La plateforme Beekee Live est donc soumise au droit suisse sur la protection des données.Les publications, photographies, noms d’utilisateurs et toutes autres données publiées sur la plateforme sont la propriété exclusive de l’utilisateur. À tout moment, il peut choisir de supprimer définitivement ces données. En aucun cas Beekee Live ne transmettra ces données à des tiers.</p><h3>Intervention d’un technicien</h3><p>Sur demande de l’utilisateur, un technicien peut accéder à un espace et consulter les données qui s’y trouvent pour résoudre un problème technique.</p><h3>Cookies</h3><p>Comme de nombreux sites internet, Beekee Live utilise des cookies pour faciliter l’utilisation de la plateforme. Les informations contenues dans ces cookies ne sont pas utilisées par Beekee Live dans un autre but.</p>","register--page-title":"Créer un compte","register--mail":"E-mail","register--name":"Nom","register--password":"Mot de passe","register--password-confirm":"Confirmez le mot de passe","register--password-dont-match":"Les mots de passe de sont pas identiques.","register--terms":"En vous enregistrant, vous acceptez notre <a href=\"{{pathFor 'privacy'}}\" target=\"_blank\">politique de confidentialité</a>.<br>Votre adresse e-mail ne sera pas transmise à des tiers.","register--button-submit":"S'enregistrer","register--mail-exist":"Un compte lié à cet e-mail existe déjà.","register--mail-no-valid-message":"Merci d'entrer une adresse e-mail valide.","register--mail-subject":"Votre inscription sur Beekee Live","register--mail-content":"<h2>Bienvenue sur <a href=\"https://live.beekee.ch\">Beekee Live</a>!</h1><h3>Nous sommes fiers de vous compter parmi nous. Commencez dès aujourd'hui à enseigner en créant votre premier espace Beekee Live !</h3><p><b>Astuce</b> : Savez-vous que vous pouvez utiliser Beekee Live sur ordinateur, smartphone ou tablette sans avoir besoin d'installer une app ?</p><p>L'<a href=\"https://www.beekee.ch\">équipe Beekee</a></p>","reset-password--page-title":"Réinitialiser votre mot de passe","reset-password--new-password":"Nouveau mot de passe","reset-password--button-submit":"Enregistrer","register--password-changed-message":"Le mot de passe a été changé.","space-edit-categories--page-title":"Gérer les catégories","space-edit-categories--page-description":"Les catégories servent à classer les publications.<br />À la différence des tags, les catégories sont définies à l'avance par l'enseignant.","space-edit-categories--confirm-delete":"Supprimer la catégorie","space-edit--button-submit-add-category":"Ajouter","space-edit-categories--edit-category":"Modifier la catégorie","space-edit--page-title":"Paramètres","space-edit--subtitle-general":"Général","space-edit--list-title-change-code":"Changer le code d'accès","space-edit--description-change-code":"Transmettez le code d'accès à vos élèves pour qu'ils  rejoignent cet espace.","space-edit--list-title-rename-space":"Renommer cet espace","space-edit--list-title-delete-space":"Supprimer cet espace","space-edit--list-title-content":"Contenu","space-edit--list-title-flow":"Flux continu","space-edit--description-flow":"En activant le flux continu, les nouvelles publications s'affichent en temps réel.","space-edit--list-title-categories":"Gérer les catégories","space-edit--list-title-comments":"Autoriser les commentaires","space-edit--subtitle-users":"Utilisateurs","space-edit--list-title-users":"Gérer les auteurs","space-edit--list-title-free-users":"Auteurs libres","space-edit--description-free-users":"En activant \"Auteurs libres\", les utilisateurs entrent eux-même leur nom d'utilisateur à la première connexion. Autrement, ils choisiront parmis une liste modifiable sous \"Gérer les auteurs\".","space-edit--subtitle-permissions":"Permissions","space-edit--select-permissions-own":"Les auteurs peuvent modifier leurs propres publications","space-edit--select-permissions-all":"Les auteurs peuvent modifier toutes les publications","space-edit--select-permissions-none":"Personne ne peut ajouter ou modifier des publications","space-edit--subtitle-box":"Box","space-edit--list-title-update-box":"Mettre à jour la box","space-edit--list-title-ip":"Adresse IP :","space-edit--list-title-sync":"Syncroniser avec le cloud","space-edit--description-sync":"Branchez la beekee box à l'aide d'un câble ethernet pour syncroniser son contenu avec le cloud (www.beekee.ch). Cela peut prendre plusieurs minutes.","space-edit--subtitle-account":"Votre compte","space-edit--description-change-password":"Modifier le mot de passe de votre compte.","space-edit--change-code-message":"Changer le code d'accès","space-edit--change-code-confirm-message":"Le code d'accès a été changé.","space-edit--change-code-already-used-message":"Ce code est déjà attribué à un autre espace.","space-edit--rename-space-message":"Renommer cet espace","space-edit--rename-space-confirm-message":"Cet espace s'appelle désormais","space-edit--delete-space-message":"Effacer définitivement cet espace et son contenu ?","space-edit--delete-space-confirm-message":"L'espace a bien été supprimé.","space-edit--sync-login-message":"Pour synchroniser cet espace avec le cloud, vous devez posséder un compte sur www.beekee.ch.\nSi c'est le cas, entrez le nom d'utilisateur de votre compte :","space-edit--sync-error-message":"Un problème est survenu. Vérifiez que la box est bien connectée à internet et recommencez.","space-edit--update-message":"La mise à jour de la box peut rendre la plateforme inaccessible pendant plusieurs minutes.\nVoulez-vous continuer ?","space-edit--update-waiting-message":"La box va être mise à jour, merci de patienter...","space-edit--no-ip":"Pas d'adresse IP","space-edit--not-connected":"Non connecté","space-edit--module-resources":"Mettre à disposition des fichiers pour vos étudiants","space-edit--public-space":"Permet à n'importe qui de se connecter à cet espace sans nécessiter de code d'accès","space-edit--permissions-add-categories":"Les utilisateurs peuvent ajouter des catégories","space-edit--permissions-add-resource":"Les utilisateurs peuvent ajouter des resources","space-edit--permissions-add-posts":"Les utilisateurs peuvent ajouter des posts","space-edit-authors---page-title":"Gérer les auteurs","space-edit-authors---page-description":"Les auteurs servent à identifier les publications.<br>Ajoutez par exemple le nom de vos élèves ou le nom d'un groupe.","space-edit-authors---submit-button":"Ajouter","space-edit-authors--delete-author-message":"Supprimer l'auteur %s ?","space-edit-authors--edit-author-message":"Modifier l'auteur :","space-edit-authors--add-author-error-message":"Il y a déjà un auteur avec ce nom.","index-student--title":"La plateforme pour soutenir la collaboration en temps réel","index-student--wrapper-text":"Un espace privé pour partager photos et messages<br>avec vos étudiants, collègues ou amis.","index-student--code":"Espace privé","index-student--code-input-placeholder":"Entrez un code d'accès","index-student--visited-title":"Récemment visité :","index-student--delete-recent":"(effacer)","index-student--public-spaces-title":"Espaces publics","index-student--button-code-link":"Valider","index-student--space-doesnt-exist-message":"Cet espace n'existe pas.\nAssurez-vous de respecter les majuscules et les minuscules.","index-student--create-your-space-1":"Créez","index-student--create-your-space-2":" gratuitement votre propre espace en quelques secondes !","index-student--privacy":"Confidentialité","index-student--about-us":"À propos de nous","index-teacher--spaces-title":"Vos espaces","index-teacher--no-space":"Vous n'avez pas encore créé d'espace.","index-teacher--button-submit-space":"Créer un nouvel espace","index-teacher--shutdown":"Éteindre","index-teacher--shutdown-message":"Voulez-vous vraiment éteindre la box ?","index-teacher--shutdown-confirm":"La box va s'éteindre dans quelques secondes...","update--reboot-confirm":"La box va redémarrer dans quelques secondes...","space-page--hide-panel":"Cacher","space-page--code-panel-title":"Code d'accès de l'espace :","space-page--code-panel-description":"Transmettez ce code pour que d'autres vous rejoignent:","space-page--pinned-title":"Épinglés","space-page--post-order":"Tri","space-page--post-order-asc":"Plus récents d'abord","space-page--post-order-desc":"Plus anciens d'abord","space-page--no-post":"Il n'y pas encore de publication à afficher.","space-submit--page-title":"Créer un espace","space-submit--space-name":"Nom de l'espace","space-submit--button-submit":"Créer","space-submit--button-cancel":"Annuler","space-users-first-connection--page-title":"Quel est votre nom ?","space-users--page-title":"Vous voulez changer de nom d'utilisateur ?","space-users--page-description":"Il sera utilisé pour identifier vos contributions","space-users--input-choose-author-placeholder":"Entrez un nom...","space-users--submit-author":"Valider","space-users--user-exist":"L'utilisateur %s existe déjà. Se connecter avec ce nom ?","space-sidebar--home":"Accueil","space-sidebar--live-feed":"Direct","space-sidebar--categories":"CATEGORIES","space-sidebar--add-category":"Ajouter","space-sidebar--authors":"AUTEURS","space-sidebar--lessons":"Leçons","space-sidebar--resources":"Ressources","space-sidebar--create-own-space-1":"Créé votre propre espace","space-sidebar--create-own-space-2":"gratuitement !","space-sidebar--privacy":"Confidentialité","space-sidebar--about-us":"À propos de nous","space-submit--create-space":"Créer un nouvel espace","space-submit--create-space-placeholer":"Nom de l'espace","header--back":"Retour","header--admin-access":"Accès enseignant","header--register":"Créer un comte","header--login":"S'identifier","header--exit-message":"Quitter cet espace ?","menu--show-all":"Tout afficher","menu--favorites":"Mes favoris","menu--files":"Fichiers","menu--images":"Images","menu--categories":"Catégories","menu--authors":"Auteurs","menu--tags":"Mots-clés","menu--code":"Code d'accès","post-edit--submit-button":"Modifier","post-item--remove-pin":"Retirer l'épingle","post-item--add-pin":"Épingler en haut","post-item--remove-favorites":"Retirer de mes favoris","post-item--add-favorites":"Ajouter à mes favoris","post-item--delete-post-confirm":"Effacer la publication ?","post-item--delete-comment-confirm":"Effacer le commentaire ?","post-submit--body-placeholder":"Dites quelque chose...","post-submit--tags-placeholder":"Ajoutez des mots-clés...","post-submit--select-category":"Sélectionnez une catégorie","post-submit--no-category":"Aucune catégorie","post-submit--delete-image":"Supprimer l'image","post-submit--confirm-delete-image":"Effacer l'image ?\nCette action est irréversible.","post-submit--confirm-delete-file":"Effacer le fichier ?\nCette action est irréversible.","post-submit--submit-button":"Envoyer","user-settings--page-title":"Paramètres de l'utilisateur","user-settings--confirm-logout":"Voulez-vous vraiment vous déconnecter ?","user-settings--change-password":"Changer mot de passe","user-settings--logout":"Se déconnecter","user-settings--change-password-old-message":"Mot de passe actuel :","user-settings--change-password-new-message":"Nouveau mot de passe :","user-settings--change-password-confirm-message":"Votre mot de passe a été changé.","space-header--leave":"Quitter cet espace","space-header--settings":"Paramètres","post--edit":"Éditer","post--delete":"Supprimer","home--title":"Accueil","home--space-code-message":"<strong>Bzz!</strong> Partagez ce code pour que d'autres se joignent à vous:","home--submit-button":"Ajouter une section","home-post--order-up":"Monter","home-post--order-down":"Descendre","home-post-delete--title":"Supprimer cette section","home-post-delete--confirm":"Supprimer cette section ?","modal--close":"Fermer","modal--cancel":"Annuler","modal--delete":"Supprimer","modal--save":"Sauver les changements","modal--submit":"Soumettre","home-post-edit--title":"Modifier la section","home-post-submit--title":"Ajouter une section","home-post-submit--placeholder":"Titre de la section","home-post-submit--confirm-toast":"La section a été ajoutée.","lessons--title":"Leçons","lessons--subtitle":"E-learning Articulate Storyline","lessons--submit-button":"Ajouter une leçon","lessons-post--start-lesson":"Lancer cette leçon","lessons-post-submit--title":"Ajouter une leçon","lessons-post-submit--title-placeholder":"Titre de la leçon","lessons-post-submit--description-placeholder":"Description de la leçon","lessons-post-submit--help":"Les leçons doivent être exportées au format HTML5 à partir du logiciel Storyline.<br>Le dossier résultant doit être zippé avant d'être uploadé, et le .zip doit avoir le même nom que le dossier qu'il contient.","lessons-post-submit--confirm-toast":"La leçon a été ajoutée.","lessons-post-delete--confirm":"Voulez-vous supprimer cette leçon ?","lessons-post-delete--title":"Supprimer cette leçon","lessons-post-edit--title":"Editer une leçon","lessons-upload--button":"Uploader une leçon Storyline","resources--title":"Ressources","resources-post-edit--title":"Editer une resource","resources-post-submit--title":"Ajouter une ressource","resources-post-submit--title-placeholder":"Titre de la ressource","resources-post-submit--description-placeholder":"Description de la ressource","resources-post-submit--confirm-toast":"La ressource a été ajoutée.","resources--submit-button":"Ajouter une ressource","resources-category-edit--title":"Éditer une catégorie","resources-category-submit--title":"Ajouter une catégorie","resources-category-submit--placeholder":"Nom de la catégorie","live-feed--notification-panel":"nouveau(x) message(s)","live-feed--load-more":"Charger plus...","live-feed-category-edit--title":"Éditer une catégorie","live-feed-category-submit--title":"Ajouter une catégorie","live-feed-category-submit--placeholder":"Nom de la catégorie","live-feed-post-delete--delete-confirm":"Voulez-vous supprimer ce post ?","live-feed-post-delete--title":"Supprimer ce post","live-feed-post--add-comment":"Ajoutez un commentaire...","live-feed-post--nb-likes-with-me":"Vous et %s personne(s)","live-feed-post--like":"Vous aimez","live-feed-post--nb-likes":"personne(s)","live-feed-post-submit--add-category":"+ Ajouter une catégorie...","live-feed-post-edit--title":"Éditer un post","live-feed-delete-comment--title":"Supprimer un commentaire","live-feed-delete-comment--subtitle":"Supprimer ce commentaire ?"});
TAPi18n._registerServerTranslator("fr-FR", namespace);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"app_loader.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/app_loader.js                                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
if (Meteor.isServer) {
  Inject.rawHead("metaLoader", '<meta name="viewport" content="initial-scale=1.0, user-scalable=0, width=device-width, height=device-height"/><meta name="apple-mobile-web-app-capable" content="yes">	<meta name="mobile-web-app-capable" content="yes">');
  Inject.rawBody("htmlLoader", Assets.getText('app_loader.html'));
}

if (Meteor.isClient) {
  Meteor.startup(function () {
    setTimeout(function () {
      $("#inject-loader-wrapper").fadeOut(500, function () {
        $(this).remove();
      });
    }, 700);
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"imports":{"api":{"authors.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/authors.js                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  Authors: () => Authors
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
let Posts;
module.link("./posts.js", {
  Posts(v) {
    Posts = v;
  }

}, 1);
const Authors = new Mongo.Collection('resources-authors');
Authors.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  update: function () {
    return true;
  }
});

if (Meteor.isServer) {
  Meteor.publish("authors", function (spaceId) {
    return Authors.find({
      spaceId: spaceId
    });
  });
}

Meteor.methods({
  authorInsert: function (name, spaceId) {
    Authors.insert({
      name: name,
      spaceId: spaceId,
      nRefs: 0
    }, function (error) {
      if (error) {
        console.log("Error when inserting author  : " + error.message);
      } else {
        console.log("Author inserted");
      }
    });
  },
  authorEdit: function (spaceId, oldName, newName) {
    var author = Authors.findOne({
      name: oldName,
      spaceId: spaceId
    });
    Authors.update(author._id, {
      $set: {
        name: newName
      }
    }, function (error) {
      if (error) {
        console.log("Error when changing author name : " + error.message);
      } else {
        Posts.update({
          spaceId: spaceId,
          author: oldName
        }, {
          $set: {
            author: newName
          }
        }, {
          multi: true
        }); // Update all author posts with new name
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"categories.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/categories.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  Categories: () => Categories
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
let Posts;
module.link("./posts.js", {
  Posts(v) {
    Posts = v;
  }

}, 1);
const Categories = new Mongo.Collection('resources-categories');
Categories.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  update: function () {
    return true;
  }
});

if (Meteor.isServer) {
  Meteor.publish("categories", function (spaceId) {
    return Categories.find({
      spaceId: spaceId
    });
  });
}

Meteor.methods({
  categoryInsert: function (type, name, spaceId) {
    Categories.insert({
      type: type,
      name: name,
      spaceId: spaceId,
      nRefs: 0
    });
  },
  categoryEdit: function (spaceId, type, oldName, newName) {
    var category = Categories.findOne({
      type: type,
      name: oldName,
      spaceId: spaceId
    });
    Categories.update(category._id, {
      $set: {
        name: newName
      }
    }, function (error) {
      if (error) {
        console.log("Error when changing category name : " + error.message);
      } else {
        Posts.update({
          spaceId: spaceId,
          type: type,
          category: oldName
        }, {
          $set: {
            category: newName
          }
        }, {
          multi: true
        }); // Update all author posts with new name
      }
    });
  },
  categoryDelete: function (type, name, spaceId) {
    var category = Categories.findOne({
      type: type,
      name: name,
      spaceId: spaceId
    });
    Categories.remove(category._id, function (error) {
      if (error) {
        console.log("Error when deleting category : " + error.message);
      } else {
        Posts.update({
          type: type,
          spaceId: spaceId,
          category: name
        }, {
          $unset: {
            category: ""
          }
        }, {
          multi: true
        }); // Update all author posts with new name
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"codes.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/codes.js                                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  Codes: () => Codes
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Codes = new Mongo.Collection('resources-codes');
Codes.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  update: function () {
    return true;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"files.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/files.js                                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  Files: () => Files
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Files = new Mongo.Collection('resources-files');
Files.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  update: function () {
    return true;
  }
});

if (Meteor.isServer) {
  Meteor.publish("file", function (fileId) {
    return Files.find({
      _id: fileId
    });
  });
  Meteor.publish("files", function (spaceId) {
    return Files.find({
      spaceId: spaceId
    });
  });
  Meteor.publish("allFiles", function () {
    return Files.find({});
  });
  Meteor.publish("files", function (spaceId) {
    console.log("tu publies...");
    return Files.find({
      spaceId: spaceId
    });
  });

  var fs = Npm.require('fs');

  var rimraf = Npm.require('rimraf'); // Package to delete directories


  var uploadDir = Meteor.settings.uploadDir;
  Meteor.methods({
    deleteFile: function (post) {
      if (post.type == 'lesson') // Remove directory (each storline lesson is stored in is own directory)
        rimraf(uploadDir + "/" + post.spaceId + "/" + post.type + "/" + post.fileId, function (err) {
          console.log(err);
        });else // Remove the file
        fs.unlinkSync(uploadDir + "/" + post.filePath, function (err) {
          console.log(err);
        });
    }
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"posts.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/posts.js                                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  Posts: () => Posts
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
let Authors;
module.link("./authors.js", {
  Authors(v) {
    Authors = v;
  }

}, 1);
let Spaces;
module.link("./spaces.js", {
  Spaces(v) {
    Spaces = v;
  }

}, 2);
let Categories;
module.link("./categories.js", {
  Categories(v) {
    Categories = v;
  }

}, 3);
let Files;
module.link("./files.js", {
  Files(v) {
    Files = v;
  }

}, 4);
const Posts = new Mongo.Collection('resources-posts');
Posts.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  update: function () {
    return true;
  }
});

if (Meteor.isClient) {
  Counts = new Mongo.Collection("counts"); // Store post count of a space ; Allow to count them without subscribe to all posts (optimization)

  PinnedCounts = new Mongo.Collection("pinnedCounts");
  FilesCounts = new Mongo.Collection("filesCounts");
  ImagesCounts = new Mongo.Collection("imagesCounts");
  LiveFeedCounts = new Mongo.Collection("liveFeedCounts");
}

if (Meteor.isServer) {
  Meteor.publish('post', function (postId) {
    check(postId, String);
    return Posts.find({
      _id: postId
    });
  });
  Meteor.publish('homePosts', function (spaceId) {
    check(spaceId, String);
    return Posts.find({
      spaceId: spaceId,
      type: "home"
    }, {
      sort: {
        submitted: 1
      }
    });
  });
  Meteor.publish('liveFeedPosts', function (spaceId) {
    check(spaceId, String);
    return Posts.find({
      spaceId: spaceId,
      type: "liveFeed"
    }, {
      sort: {
        submitted: -1
      }
    });
  });
  Meteor.publish('resourcesPosts', function (spaceId) {
    check(spaceId, String);
    return Posts.find({
      spaceId: spaceId,
      type: "resources"
    });
  });
  Meteor.publish('posts', function (filters) {
    let skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return Posts.find(filters, {
      sort: {
        submitted: 1
      },
      skip: skip,
      limit: limit
    });
  });
  Meteor.publish("count-all-live-feed", function (spaceId) {
    var self = this;
    var liveFeedCounts = 0;
    var initializing = true;
    var handle = Posts.find({
      spaceId: spaceId,
      type: 'liveFeed'
    }).observeChanges({
      added: function (doc, idx) {
        liveFeedCounts++;

        if (!initializing) {
          self.changed("liveFeedCounts", spaceId, {
            count: liveFeedCounts
          }); // "counts" is the published collection name
        }
      },
      removed: function (doc, idx) {
        liveFeedCounts--;
        self.changed("liveFeedCounts", spaceId, {
          count: liveFeedCounts
        }); // Same published collection, "counts"
      }
    });
    initializing = false; // publish the initial count. `observeChanges` guaranteed not to return
    // until the initial set of `added` callbacks have run, so the `count`
    // variable is up to date.

    self.added("liveFeedCounts", spaceId, {
      count: liveFeedCounts
    }); // and signal that the initial document set is now available on the client

    self.ready(); // turn off observe when client unsubscribes

    self.onStop(function () {
      handle.stop();
    });
  });
} // if(Meteor.isServer) {
// 	Posts.before.insert(function (userId, doc) {
// 		// change modified date
// 		Spaces.update(doc.spaceId, {$set: {modified: Date.now()}});
// 		doc.version =  1;
// 		//doc.modified = Date.now();
// 		/*
// 		var versionning = {};
// 		_.extend(versionning, doc, {modifiedBy: userId});
// 		Meteor.call('addPostVersion', versionning);
// 		*/
// 	});
// 	// Copy post in postVersion before updated
// 	// TODO : refactoring
// 	Posts.before.update(function (userId, doc, fieldNames, modifier, options) {
// 		// var versionning = {};
// 		// _.extend(versionning, doc, {modifiedBy: userId});
// 		// Meteor.call('addPostVersion', versionning);
// 		// var newInc = doc.version+1;
// 		// if (!modifier.$set) modifier.$set = {};
// 		// modifier.$set.version = newInc;
// 		// modifier.$set.modified = Date.now();
// 	});
// 	Posts.before.remove(function (userId, doc) { 
// 		// var deletionTime = Date.now();
// 		// Meteor.call('tagsEdit', {spaceId: doc.spaceId, newTags: [], oldTags: doc.tags}, function(error) { // Decrement tags nRefs
// 		// 	if (error) {
// 		// 		throwError(error.reason);
// 		// 	}
//  	// 	});
// 		// var file = Files.findOne({'metadata.postId': doc.fileId}); // Remove file
// 		// if (file){
// 		// 	 // TODO : remove file (not only from collection)
// 		// 	Files.remove(file._id);
// 		// }
// 		// Delete the file if exists
// 		var fileId = doc.fileId;
// 		var fileExt = doc.fileExt;
// 		if (fileId) {
// 			Files.remove({fileId:fileId});
// 			Meteor.call('deleteFile',doc);
// 		}
// 		if (doc.type == 'home') { // Update post order
// 			var post = doc;
// 			var postsDown = Posts.find({spaceId:doc.spaceId, type:'home', order:{$gt:post.order}}).fetch();
// 			for (var i=0; i<postsDown.length; i++) {
// 				console.log("id : "+postsDown[i]._id);
// 				var currentPost = postsDown[i];
// 				Posts.update({_id:currentPost._id},{$set:{order:currentPost.order-1}});
// 			}
// 		}
// 		if (doc.type == 'liveFeed') {
// 			var author = Authors.findOne({spaceId: doc.spaceId, name: doc.author});
// 			Authors.update(author._id, {$inc: {nRefs: -1}}); // Decrement author nRefs
// 			if (doc.category) {
// 				var category = Categories.findOne({spaceId: doc.spaceId, type:"liveFeed", name: doc.category});
// 				if (category)
// 					Categories.update(category._id, {$inc: {nRefs: -1}}); // Decrement category nRefs
// 			}
// 		}
// 		if (doc.type == 'resource') {
// 			if (doc.category) {
// 				var category = Categories.findOne({spaceId: doc.spaceId, type:"resource", name: doc.category});
// 				if (category)
// 					Categories.update(category._id, {$inc: {nRefs: -1}}); // Decrement category nRefs
// 			}
// 		}
// 		// // Add post to posts versions
// 		// // TODO : refactoring
// 		// var space = Spaces.findOne(doc.spaceId);
// 		// // var oldPosts = [];
// 		// // if (space.oldPosts !== undefined) {
// 		// // 	oldPosts = space.oldPosts;
// 		// // }
// 		// // oldPosts.push(doc._id);
// 		// //Spaces.update(doc.spaceId, {$set: {oldPosts: oldPosts, modified: Date.now()}});
// 		// Spaces.update(doc.spaceId, {$set: {modified: Date.now()}});
// 		// doc.version =  doc.version++;
// 		// doc.modified = Date.now();
// 		// var versionning = {};
// 		// _.extend(versionning, doc, {modifiedBy: userId, last: true});
// 		// Meteor.call('addPostVersion', versionning);
// 	});
// }


if (Meteor.isServer) {
  Posts.after.remove(function (userId, doc) {
    // Delete the file if exists
    var fileId = doc.fileId;
    var fileExt = doc.fileExt;

    if (fileId) {
      Files.remove({
        fileId: fileId
      });
      Meteor.call('deleteFile', doc);
    } // Decrease category count


    if (doc.type == 'resource') {
      if (doc.category) {
        var category = Categories.findOne({
          spaceId: doc.spaceId,
          type: "resource",
          name: doc.category
        });
        if (category) Categories.update(category._id, {
          $inc: {
            nRefs: -1
          }
        }); // Decrement category nRefs
      }
    }
  });
}

Meteor.methods({
  addLikeComment: function (data) {
    Posts.update({
      _id: data.currentPostId,
      "comments.id": data.currentCommentId
    }, {
      $push: {
        "comments.$.likes": data.author
      }
    });
  },
  removeLikeComment: function (data) {
    Posts.update({
      _id: data.currentPostId,
      "comments.id": data.currentCommentId
    }, {
      $pull: {
        "comments.$.likes": data.author
      }
    });
  },
  homePostInsert: function (postAttributes) {
    check(postAttributes.spaceId, String); //if (Meteor.settings.public)
    //var postFromCloud = !(Meteor.settings.public.isBox === "true"); // Set where post is submitted (box or cloud)

    post = _.extend(postAttributes, {
      submitted: Date.now(),
      order: Posts.find({
        spaceId: postAttributes.spaceId,
        type: postAttributes.type
      }).count() //nb: Posts.find({spaceId: postAttributes.spaceId}).count() + 1,
      //pinned : false,

    });
    var space = Spaces.findOne(postAttributes.spaceId);
    post._id = Posts.insert(post);
    return post._id;
  },
  postInsert: function (postAttributes) {
    check(postAttributes.spaceId, String); //if (Meteor.settings.public)
    //var postFromCloud = !(Meteor.settings.public.isBox === "true"); // Set where post is submitted (box or cloud)
    // item = Authors.findOne({spaceId: postAttributes.spaceId, name: postAttributes.author});
    // Authors.update(item, {$inc: {nRefs: 1}});
    // post = _.extend(postAttributes, {
    // 	authorId: Authors.findOne({spaceId: postAttributes.spaceId, name: postAttributes.author})._id,
    // 	submitted: Date.now(),
    // 	nb: Posts.find({spaceId: postAttributes.spaceId}).count() + 1,
    // 	pinned : false,
    // 	// postFromCloud: postFromCloud // Workaround bug sync
    // });
    // Get client IP address

    if (Meteor.isServer) post = _.extend(postAttributes, {
      clientIP: this.connection.clientAddress
    });
    var space = Spaces.findOne(postAttributes.spaceId);
    category = Categories.findOne({
      spaceId: postAttributes.spaceId,
      name: postAttributes.category
    }); // Increment category nRefs

    Categories.update(category, {
      $inc: {
        nRefs: 1
      }
    });
    post._id = Posts.insert(post);
    return post._id;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"spaces.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/spaces.js                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  Spaces: () => Spaces
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
let Authors;
module.link("./authors.js", {
  Authors(v) {
    Authors = v;
  }

}, 1);
let Codes;
module.link("./codes.js", {
  Codes(v) {
    Codes = v;
  }

}, 2);
let Posts;
module.link("./posts.js", {
  Posts(v) {
    Posts = v;
  }

}, 3);
const Spaces = new Mongo.Collection('resources-spaces');
Spaces.allow({
  //update: function(userId, space) { return true},
  //remove: function(userId, space) { return true},
  insert: function (userId, space) {
    return ownsDocument(userId, space) || isAdmin(userId);
  },
  update: function (userId, space) {
    return ownsDocument(userId, space) || isAdmin(userId);
  },
  remove: function (userId, space) {
    return ownsDocument(userId, space) || isAdmin(userId);
  }
});

if (Meteor.isServer) {
  console.log("is Server..."); // var connection = DDP.connect("http://beekee.box:80");
  // Accounts.connection = connection;
  // Meteor.users = new Mongo.Collection("users", {connection: connection});

  Meteor.publish('space', function (spaceId) {
    console.log("publication space...");
    check(spaceId, String);
    return Spaces.find({
      _id: spaceId
    });
  });
  Meteor.publish('allSpaces', function () {
    return Spaces.find({});
  });
  Meteor.publish('allUsers', function () {
    return Meteor.users.find();
  });
  Meteor.publish('publicSpaces', function (userId) {
    return Spaces.find({
      "permissions.public": true
    });
  });
  Meteor.publish('ownSpaces', function (userId) {
    console.log("own space... : " + Spaces.find());
    return Spaces.find({
      userId: userId
    });
  });
  Meteor.publish('spacesVisited', function (spacesId) {
    return Spaces.find({
      "_id": {
        "$in": spacesId
      }
    });
  }); // Spaces.before.update(function (userId, doc, fieldNames, modifier, options) {
  // 	modifier.$set = modifier.$set || {};
  // 	modifier.$set.modified = Date.now();
  // 	// change modified date
  // 	doc.version =  doc.version++;
  // 	doc.modified = Date.now();
  // });
  // Spaces.before.insert(function (userId, doc) {
  // 	// change modified date
  // 	doc.submitted =  Date.now();
  // });
  // Spaces.before.remove(function (userId, doc) {
  // 	var spaceId = doc._id;
  // 	Posts.remove({spaceId:spaceId});
  // });

  Meteor.methods({
    getSpaceId: function (spaceCode) {
      if (Spaces.findOne({
        spaceCode: spaceCode
      })) return Spaces.findOne({
        spaceCode: spaceCode
      })._id;else return null;
    },
    updateCode: function (oldCode, newCode) {
      var codeId = Codes.findOne({
        code: oldCode
      })._id;

      Codes.update(codeId, {
        code: newCode
      }, function (error) {
        if (error) {
          console.log("Error when changing code : " + error.message);
        } else {
          console.log("Code has been changed.");
        }
      });
    },
    deleteSpace: function (spaceId) {
      Spaces.remove(spaceId); //Posts.remove({spaceId:spaceId},{multi:true});
    },
    deleteSpaces: function (userId) {
      Spaces.remove({
        userId: userId
      });
    },
    spaceInsert: function (spaceAttributes) {
      check(spaceAttributes, {
        title: String,
        lang: String
      });
      var nbOfCodes = Codes.find().count();
      var prefix = Meteor.settings.public.prefix;
      var codeLength = 4;
      if (nbOfCodes <= 1000) codeLength = 2;else if (nbOfCodes > 1000 && nbOfCodes <= 100000) codeLength = 3;else if (nbOfCodes > 100000 && nbOfCodes <= 10000000) codeLength = 4;
      var code = prefix + makeCode(codeLength);

      while (typeof Codes.findOne({
        code: code
      }) != 'undefined') code = prefix + makeCode(codeLength);

      Codes.insert({
        code: code,
        userId: Meteor.userId()
      });
      var userId = Meteor.userId();
      console.log("user Id : " + Accounts.userId());
      console.log("user Id : " + Meteor.userId());

      var space = _.extend(spaceAttributes, {
        userId: userId,
        spaceCode: code,
        submitted: new Date(),
        visible: true,
        codePanel: true,
        createUserAllowed: true,
        liveFeed: true,
        lessons: false,
        resources: true,
        liveFeedComments: true,
        permissions: {
          public: false,
          liveFeedAddPost: true,
          liveFeedAddCategory: false
        }
      });

      var spaceId = Spaces.insert(space);
      Meteor.call('authorInsert', 'Invité', spaceId); // Insert welcome post

      if (spaceAttributes.lang == "fr-FR" || spaceAttributes.lang == "fr") Posts.insert({
        spaceId: spaceId,
        type: "home",
        order: 0,
        submitted: Date.now(),
        title: "Bienvenue dans votre nouvel espace Beekee Live !",
        body: "<p>Beekee Live est l'outil idéal pour soutenir les interactions en temps réel, pour partager des photos ou des fichiers avec vos étudiants.</p>\n<p>Ce message est visible par vos étudiants : sentez-vous libre de le modifier (ou de le supprimer) pour communiquer avec eux.</p>"
      });else Posts.insert({
        spaceId: spaceId,
        type: "home",
        order: 0,
        submitted: Date.now(),
        title: "Welcome to your new Beekee Live space!",
        body: "<p>Beekee Live is ideal for real-time interactions and to share pictures or files with your learners.</p>\n<p>This message will be visibile for everyone: feel free to edit (or delete ) it according to your needs.</p>"
      });
      return {
        _id: spaceId
      };
    }
  });
}

function makeCode(length) {
  var text = "";
  var possible = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789";

  for (var i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"server":{"fixtures.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/fixtures.js                                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let Spaces;
module.link("../imports/api/spaces.js", {
  Spaces(v) {
    Spaces = v;
  }

}, 0);

// ###  Create admin user at first start  ###
if (Spaces.find().count() === 0) {
  if (Meteor.users.find().count() === 0) {
    // Create the admin role
    Roles.createRole('admin', {
      unlessExists: true
    });
    var adminPassword = Meteor.settings.adminPassword;
    var users = [{
      username: "admin",
      roles: ['admin']
    }];

    _.each(users, function (user) {
      var id;
      id = Accounts.createUser({
        username: user.username,
        email: "admin@beekee.ch",
        //password: adminPassword,
        password: "admin",
        profile: {
          name: "Admin"
        }
      });

      if (user.roles.length > 0) {
        Roles.addUsersToRoles(id, user.roles);
      }
    });
  }

  Spaces.insert({
    _id: "efBc3pjC2JidnkLA2",
    title: "Resources",
    userId: "Admin"
  });
  Accounts.createUser({
    username: "marc",
    email: "marc@marc.ch",
    //password: adminPassword,
    password: "12345",
    profile: {
      name: "Marc"
    }
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"permissions.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/permissions.js                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// check that the userId specified owns the documents
ownsDocument = function (userId, doc) {
  return doc && doc.userId === userId;
}; // check that the userId specified is admin


isAdmin = function (userId) {
  return Roles.userIsInRole(Meteor.user(), 'admin');
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publications.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/publications.js                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Meteor.publish('space', function(spaceId) {
// 	check(spaceId, String);
// 	return Spaces.find({_id: spaceId});	
// });
// Meteor.publish('allSpaces', function() {
// 	return Spaces.find({});
// });
// Meteor.publish('publicSpaces', function(userId) {
// 	return Spaces.find({"permissions.public":true});
// });
// Meteor.publish('ownSpaces', function(userId) {
// 	return Spaces.find({userId:userId});
// });
// Meteor.publish('spacesVisited', function(spacesId) {
// 	return Spaces.find({ "_id": { "$in": spacesId } });
// });
// Meteor.publish('post', function(postId) {
// 	check(postId, String);
// 	return Posts.find({_id: postId});
// });
// Meteor.publish('homePosts', function(spaceId) {
// 	check(spaceId, String);
// 	return Posts.find({spaceId: spaceId, type:"home"},{sort: {submitted: 1}});
// });
// Meteor.publish('liveFeedPosts', function(spaceId) {
// 	check(spaceId, String);
// 	return Posts.find({spaceId: spaceId, type:"liveFeed"},{sort: {submitted: -1}});
// });
// Meteor.publish('lessonsPosts', function(spaceId) {
// 	check(spaceId, String);
// 	return Posts.find({spaceId: spaceId, type:"lessons"});
// });
// Meteor.publish('resourcesPosts', function(spaceId) {
// 	check(spaceId, String);
// 	return Posts.find({spaceId: spaceId, type:"resources"});
// });
// Meteor.publish('posts', function(filters, skip = 0, limit = 0) {
// 	return Posts.find(filters, {sort: {submitted:1},skip:skip,limit:limit});
// });
// // Meteor.publish('posts', function(filters,skip,limit) {
// // 	return Posts.find(filters, {sort: {submitted: 1},skip:skip,limit:limit});
// // });
// Meteor.publish("file", function(fileId) {
// 	return Files.find({_id:fileId})
// });
// Meteor.publish("files", function(spaceId) {
// 	return Files.find({spaceId: spaceId})
// });
// Meteor.publish("allFiles", function() {
// 	return Files.find({})
// });
// Meteor.publish("authors", function(spaceId) {
// 	return Authors.find({spaceId: spaceId});
// });
// Meteor.publish("categories", function(spaceId) {
// 	return Categories.find({spaceId: spaceId});
// });
// Meteor.publish("tags", function(spaceId) {
// 	return Tags.find({spaceId: spaceId});
// });
// Meteor.publish('allUsers', function() {
// 	return Meteor.users.find();
//  })
// Publish the current size of a collection without subscribe to the collection
// Meteor.publish("count-all-live-feed-posts", function (spaceId) {
// 	var self = this;
// 	var count = 0;
// 	var initializing = true;
// 	var handle = Posts.find({spaceId: spaceId, type:"liveFeed"}).observeChanges({
// 		added: function (doc, idx) {
// 			count++;
// 			if (!initializing) {
// 				self.changed("counts", spaceId, {count: count});  // "counts" is the published collection name
// 			}
// 		},
// 		removed: function (doc, idx) {
// 			count--;
// 			self.changed("counts", spaceId, {count: count});  // Same published collection, "counts"
// 		}
// 	});
// 	initializing = false;
// 	// publish the initial count. `observeChanges` guaranteed not to return
// 	// until the initial set of `added` callbacks have run, so the `count`
// 	// variable is up to date.
// 	self.added("counts", spaceId, {count: count});
// 	// and signal that the initial document set is now available on the client
// 	self.ready();
// 	// turn off observe when client unsubscribes
// 	self.onStop(function () {
// 		handle.stop();
// 	});
// });
// Meteor.publish("count-all-pinned", function (spaceId) {
// 	var self = this;
// 	var pinnedCounts = 0;
// 	var initializing = true;
// 	var handle = Posts.find({spaceId: spaceId, pinned:true}).observeChanges({
// 		added: function (doc, idx) {
// 			pinnedCounts++;
// 			if (!initializing) {
// 				self.changed("pinnedCounts", spaceId, {count: pinnedCounts});  // "counts" is the published collection name
// 			}
// 		},
// 		removed: function (doc, idx) {
// 			pinnedCounts--;
// 			self.changed("pinnedCounts", spaceId, {count: pinnedCounts});  // Same published collection, "counts"
// 		}
// 	});
// 	initializing = false;
// 	// publish the initial count. `observeChanges` guaranteed not to return
// 	// until the initial set of `added` callbacks have run, so the `count`
// 	// variable is up to date.
// 	self.added("pinnedCounts", spaceId, {count: pinnedCounts});
// 	// and signal that the initial document set is now available on the client
// 	self.ready();
// 	// turn off observe when client unsubscribes
// 	self.onStop(function () {
// 		handle.stop();
// 	});
// });
// Meteor.publish("count-all-files", function (spaceId) {
// 	var self = this;
// 	var filesCounts = 0;
// 	var initializing = true;
// 	//var handle = Posts.find({spaceId: spaceId, $or : [{fileExt:"txt"},{fileExt:"rtf"},{fileExt:"pdf"},{fileExt:"zip"}]}).observeChanges({
// 	var handle = Posts.find({spaceId: spaceId, $and : [{fileId:{$exists:true} },{fileId:{$ne:false} },{fileExt:{$nin : ["jpg","jpeg","png","gif"]}}]}).observeChanges({
// 		added: function (doc, idx) {
// 			filesCounts++;
// 			if (!initializing) {
// 				self.changed("filesCounts", spaceId, {count: filesCounts});  // "counts" is the published collection name
// 			}
// 		},
// 		removed: function (doc, idx) {
// 			filesCounts--;
// 			self.changed("filesCounts", spaceId, {count: filesCounts});  // Same published collection, "counts"
// 		}
// 	});
// 	initializing = false;
// 	// publish the initial count. `observeChanges` guaranteed not to return
// 	// until the initial set of `added` callbacks have run, so the `count`
// 	// variable is up to date.
// 	self.added("filesCounts", spaceId, {count: filesCounts});
// 	// and signal that the initial document set is now available on the client
// 	self.ready();
// 	// turn off observe when client unsubscribes
// 	self.onStop(function () {
// 		handle.stop();
// 	});
// });
// Meteor.publish("count-all-images", function (spaceId) {
// 	var self = this;
// 	var imagesCounts = 0;
// 	var initializing = true;
// 	var handle = Posts.find({spaceId: spaceId, $or : [{fileExt:"jpg"},{fileExt:"jpeg"},{fileExt:"gif"},{fileExt:"png"}]}).observeChanges({
// 		added: function (doc, idx) {
// 			imagesCounts++;
// 			if (!initializing) {
// 				self.changed("imagesCounts", spaceId, {count: imagesCounts});  // "counts" is the published collection name
// 			}
// 		},
// 		removed: function (doc, idx) {
// 			imagesCounts--;
// 			self.changed("imagesCounts", spaceId, {count: imagesCounts});  // Same published collection, "counts"
// 		}
// 	});
// 	initializing = false;
// 	// publish the initial count. `observeChanges` guaranteed not to return
// 	// until the initial set of `added` callbacks have run, so the `count`
// 	// variable is up to date.
// 	self.added("imagesCounts", spaceId, {count: imagesCounts});
// 	// and signal that the initial document set is now available on the client
// 	self.ready();
// 	// turn off observe when client unsubscribes
// 	self.onStop(function () {
// 		handle.stop();
// 	});
// });
// Meteor.publish("count-all-live-feed", function (spaceId) {
// 	var self = this;
// 	var liveFeedCounts = 0;
// 	var initializing = true;
// 	var handle = Posts.find({spaceId: spaceId, type:'liveFeed'}).observeChanges({
// 		added: function (doc, idx) {
// 			liveFeedCounts++;
// 			if (!initializing) {
// 				self.changed("liveFeedCounts", spaceId, {count: liveFeedCounts});  // "counts" is the published collection name
// 			}
// 		},
// 		removed: function (doc, idx) {
// 			liveFeedCounts--;
// 			self.changed("liveFeedCounts", spaceId, {count: liveFeedCounts});  // Same published collection, "counts"
// 		}
// 	});
// 	initializing = false;
// 	// publish the initial count. `observeChanges` guaranteed not to return
// 	// until the initial set of `added` callbacks have run, so the `count`
// 	// variable is up to date.
// 	self.added("liveFeedCounts", spaceId, {count: liveFeedCounts});
// 	// and signal that the initial document set is now available on the client
// 	self.ready();
// 	// turn off observe when client unsubscribes
// 	self.onStop(function () {
// 		handle.stop();
// 	});
// });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"uploads.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/uploads.js                                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let Files;
module.link("../imports/api/files.js", {
  Files(v) {
    Files = v;
  }

}, 0);
// Upload files with tomitrescak:meteor-uploads
Meteor.startup(function () {
  UploadServer.init({
    tmpDir: Meteor.settings.uploadDir + '/tmp',
    uploadDir: Meteor.settings.uploadDir,
    checkCreateDirectories: true,
    getDirectory: function (fileInfo, formData) {
      var spaceId = formData.spaceId;
      fileInfo.spaceId = spaceId;
      var newID = new Mongo.ObjectID(); // Manually generate a new Mongo id

      var fileId = newID._str;
      fileInfo.fileId = fileId;

      if (formData.type == 'liveFeed') {
        console.log("Uploading a liveFeed file...");
        return '/' + spaceId + '/liveFeed/';
      } else if (formData.type == 'resource') {
        console.log("Uploading a resource...");
        return '/' + spaceId + '/resource/';
      } else if (formData.type == 'lesson') {
        console.log("Uploading lesson file...");
        return '/' + spaceId + '/lesson/' + fileId;
      } // TODO : add more security
      else if (formData.type == 'update') {
          console.log("Uploading update file");
          return '/updates';
        }

      return '/';
    },
    finished: function (fileInfo, formFields, formData) {
      var fileName = fileInfo.name.substr(0, fileInfo.name.lastIndexOf('.')) || fileInfo.name;
      fileInfo.fileName = fileName; //fileInfo.fileName = unescape(fileName); // Check why we unescape file name in getFileName method

      var fileExt = fileInfo.name.substr(fileInfo.name.lastIndexOf('.') + 1).toLowerCase();
      fileInfo.fileExt = fileExt;

      if (formFields.type == 'liveFeed' || formFields.type == 'resource') {
        if (fileExt == "jpg" || fileExt == "jpeg" || fileExt == "png") {
          // Resize and auto-orient uploaded images with GraphicMagicks
          gm(Meteor.settings.uploadDir + fileInfo.path).autoOrient().resize('1200', '1200').write(Meteor.settings.uploadDir + fileInfo.path, Meteor.bindEnvironment(function (error, result) {
            if (error) {
              console.log("Error when resizing :" + error);
              var errorMessage = "An error has occured.";
              Files.insert({
                _id: fileInfo.fileId,
                error: errorMessage
              });
            } else {
              Files.insert({
                _id: fileInfo.fileId,
                fileName: fileInfo.fileName,
                fileExt: fileExt,
                filePath: fileInfo.path
              });
            }
          }));
        } else {
          Files.insert({
            _id: fileInfo.fileId,
            fileName: fileInfo.fileName,
            fileExt: fileExt,
            filePath: fileInfo.path
          });
        }
      } else if (formFields.type == 'lesson') {
        cmd = Meteor.wrapAsync(exec);
        res = cmd("unzip '" + Meteor.settings.uploadDir + fileInfo.path + "' -d '" + Meteor.settings.uploadDir + "/" + fileInfo.spaceId + "/lesson/" + fileInfo.fileId + "'", {
          maxBuffer: 1024 * 1024 * 64
        }, function (error, result) {
          if (error) {
            console.log("Error when uploading a lesson : " + error);
            var errorMessage = "An error has occured.";
            Files.insert({
              _id: fileInfo.fileId,
              error: errorMessage
            });
          } else {
            Files.insert({
              _id: fileInfo.fileId,
              fileName: fileInfo.fileName,
              fileExt: fileExt,
              filePath: fileInfo.path
            });
          }
        });
        res2 = cmd("rm '" + Meteor.settings.uploadDir + fileInfo.path + "'");
      } else if (formFields.type == 'update') {
        cmd = Meteor.wrapAsync(exec);
        res = cmd("tar zxvf '" + Meteor.settings.uploadDir + fileInfo.path + "' -C " + Meteor.settings.updateDir, {
          maxBuffer: 1024 * 1024 * 64
        }, function (error, result) {
          if (error) {
            console.log("Error when uploading an update : " + error);
            var errorMessage = "An error has occured.";
            Files.insert({
              _id: fileInfo.fileId,
              error: errorMessage
            });
          } else {
            Files.insert({
              _id: fileInfo.fileId,
              fileName: fileInfo.fileName,
              fileExt: fileExt,
              filePath: fileInfo.path
            });
          }
        });
        res2 = cmd("rm '" + Meteor.settings.uploadDir + fileInfo.path + "'", {
          maxBuffer: 1024 * 1024 * 64
        });
      }
    },
    getFileName: function (fileInfo, formFields, formData) {
      var fileName = fileInfo.name; //fileName = escape(fileName);
      // The file name is used to generate the file path, so we escape unicode characters
      // and then we unescape it in finished method to save it in human-readable text

      return fileName; // var fileExt = fileInfo.name.substr(fileInfo.name.lastIndexOf('.')+1).toLowerCase();
      // // If file is an image, set a random name
      // if (fileExt == "jpg" || fileExt == "jpeg" || fileExt == "png") {
      // 	var newName = Random.id() + '.' + fileExt;
      // 	return newName;
      // }
      // else {
      // 	var fileName = fileInfo.name;	
      // 	fileName = encodeURIComponent(fileName);
      // 	return fileName;
      // }
    },
    cacheTime: 0
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
module.link("../server/fixtures.js");
module.link("../server/publications.js");
module.link("../server/uploads.js");
module.link("../server/permissions.js");
module.link("../lib/app_loader.js");
Meteor.startup(() => {
  Meteor.publish(null, function () {
    return Meteor.roleAssignment.find();
  }); // code to run on server at startup
  // Connect Accounts to remote App
  //Meteor.connection = DDP.connect('http://beekee.box:80');
  // Remote = DDP.connect('http://beekee.box:80');
  // Accounts.connection = Remote;
  // Meteor.users = new Mongo.Collection('users', Remote);
  //  Accounts.connection.subscribe('users');
  // __meteor_runtime_config__.ACCOUNTS_CONNECTION_URL = 'http://beekee.box:80';
  // var connection = DDP.connect("http://beekee.box:80");
  // Accounts.connection = connection;
  // Meteor.users = new Mongo.Collection("users", {connection: connection});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".ts"
  ]
});

require("/lib/i18n/en.i18n.json");
require("/lib/i18n/fr-FR.i18n.json");
var exports = require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvbGliL2FwcF9sb2FkZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL2F1dGhvcnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL2NhdGVnb3JpZXMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL2NvZGVzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2FwaS9maWxlcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvcG9zdHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3NwYWNlcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2ZpeHR1cmVzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcGVybWlzc2lvbnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9wdWJsaWNhdGlvbnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci91cGxvYWRzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJNZXRlb3IiLCJpc1NlcnZlciIsIkluamVjdCIsInJhd0hlYWQiLCJyYXdCb2R5IiwiQXNzZXRzIiwiZ2V0VGV4dCIsImlzQ2xpZW50Iiwic3RhcnR1cCIsInNldFRpbWVvdXQiLCIkIiwiZmFkZU91dCIsInJlbW92ZSIsIm1vZHVsZSIsImV4cG9ydCIsIkF1dGhvcnMiLCJNb25nbyIsImxpbmsiLCJ2IiwiUG9zdHMiLCJDb2xsZWN0aW9uIiwiYWxsb3ciLCJpbnNlcnQiLCJ1cGRhdGUiLCJwdWJsaXNoIiwic3BhY2VJZCIsImZpbmQiLCJtZXRob2RzIiwiYXV0aG9ySW5zZXJ0IiwibmFtZSIsIm5SZWZzIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsImF1dGhvckVkaXQiLCJvbGROYW1lIiwibmV3TmFtZSIsImF1dGhvciIsImZpbmRPbmUiLCJfaWQiLCIkc2V0IiwibXVsdGkiLCJDYXRlZ29yaWVzIiwiY2F0ZWdvcnlJbnNlcnQiLCJ0eXBlIiwiY2F0ZWdvcnlFZGl0IiwiY2F0ZWdvcnkiLCJjYXRlZ29yeURlbGV0ZSIsIiR1bnNldCIsIkNvZGVzIiwiRmlsZXMiLCJmaWxlSWQiLCJmcyIsIk5wbSIsInJlcXVpcmUiLCJyaW1yYWYiLCJ1cGxvYWREaXIiLCJzZXR0aW5ncyIsImRlbGV0ZUZpbGUiLCJwb3N0IiwiZXJyIiwidW5saW5rU3luYyIsImZpbGVQYXRoIiwiU3BhY2VzIiwiQ291bnRzIiwiUGlubmVkQ291bnRzIiwiRmlsZXNDb3VudHMiLCJJbWFnZXNDb3VudHMiLCJMaXZlRmVlZENvdW50cyIsInBvc3RJZCIsImNoZWNrIiwiU3RyaW5nIiwic29ydCIsInN1Ym1pdHRlZCIsImZpbHRlcnMiLCJza2lwIiwibGltaXQiLCJzZWxmIiwibGl2ZUZlZWRDb3VudHMiLCJpbml0aWFsaXppbmciLCJoYW5kbGUiLCJvYnNlcnZlQ2hhbmdlcyIsImFkZGVkIiwiZG9jIiwiaWR4IiwiY2hhbmdlZCIsImNvdW50IiwicmVtb3ZlZCIsInJlYWR5Iiwib25TdG9wIiwic3RvcCIsImFmdGVyIiwidXNlcklkIiwiZmlsZUV4dCIsImNhbGwiLCIkaW5jIiwiYWRkTGlrZUNvbW1lbnQiLCJkYXRhIiwiY3VycmVudFBvc3RJZCIsImN1cnJlbnRDb21tZW50SWQiLCIkcHVzaCIsInJlbW92ZUxpa2VDb21tZW50IiwiJHB1bGwiLCJob21lUG9zdEluc2VydCIsInBvc3RBdHRyaWJ1dGVzIiwiXyIsImV4dGVuZCIsIkRhdGUiLCJub3ciLCJvcmRlciIsInNwYWNlIiwicG9zdEluc2VydCIsImNsaWVudElQIiwiY29ubmVjdGlvbiIsImNsaWVudEFkZHJlc3MiLCJvd25zRG9jdW1lbnQiLCJpc0FkbWluIiwidXNlcnMiLCJzcGFjZXNJZCIsImdldFNwYWNlSWQiLCJzcGFjZUNvZGUiLCJ1cGRhdGVDb2RlIiwib2xkQ29kZSIsIm5ld0NvZGUiLCJjb2RlSWQiLCJjb2RlIiwiZGVsZXRlU3BhY2UiLCJkZWxldGVTcGFjZXMiLCJzcGFjZUluc2VydCIsInNwYWNlQXR0cmlidXRlcyIsInRpdGxlIiwibGFuZyIsIm5iT2ZDb2RlcyIsInByZWZpeCIsInB1YmxpYyIsImNvZGVMZW5ndGgiLCJtYWtlQ29kZSIsIkFjY291bnRzIiwidmlzaWJsZSIsImNvZGVQYW5lbCIsImNyZWF0ZVVzZXJBbGxvd2VkIiwibGl2ZUZlZWQiLCJsZXNzb25zIiwicmVzb3VyY2VzIiwibGl2ZUZlZWRDb21tZW50cyIsInBlcm1pc3Npb25zIiwibGl2ZUZlZWRBZGRQb3N0IiwibGl2ZUZlZWRBZGRDYXRlZ29yeSIsImJvZHkiLCJsZW5ndGgiLCJ0ZXh0IiwicG9zc2libGUiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiUm9sZXMiLCJjcmVhdGVSb2xlIiwidW5sZXNzRXhpc3RzIiwiYWRtaW5QYXNzd29yZCIsInVzZXJuYW1lIiwicm9sZXMiLCJlYWNoIiwidXNlciIsImlkIiwiY3JlYXRlVXNlciIsImVtYWlsIiwicGFzc3dvcmQiLCJwcm9maWxlIiwiYWRkVXNlcnNUb1JvbGVzIiwidXNlcklzSW5Sb2xlIiwiVXBsb2FkU2VydmVyIiwiaW5pdCIsInRtcERpciIsImNoZWNrQ3JlYXRlRGlyZWN0b3JpZXMiLCJnZXREaXJlY3RvcnkiLCJmaWxlSW5mbyIsImZvcm1EYXRhIiwibmV3SUQiLCJPYmplY3RJRCIsIl9zdHIiLCJmaW5pc2hlZCIsImZvcm1GaWVsZHMiLCJmaWxlTmFtZSIsInN1YnN0ciIsImxhc3RJbmRleE9mIiwidG9Mb3dlckNhc2UiLCJnbSIsInBhdGgiLCJhdXRvT3JpZW50IiwicmVzaXplIiwid3JpdGUiLCJiaW5kRW52aXJvbm1lbnQiLCJyZXN1bHQiLCJlcnJvck1lc3NhZ2UiLCJjbWQiLCJ3cmFwQXN5bmMiLCJleGVjIiwicmVzIiwibWF4QnVmZmVyIiwicmVzMiIsInVwZGF0ZURpciIsImdldEZpbGVOYW1lIiwiY2FjaGVUaW1lIiwicm9sZUFzc2lnbm1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxDQUFDQyxRQUFYLEVBQXFCO0FBQ3BCQyxRQUFNLENBQUNDLE9BQVAsQ0FBZSxZQUFmLEVBQTZCLDJOQUE3QjtBQUVBRCxRQUFNLENBQUNFLE9BQVAsQ0FBZSxZQUFmLEVBQTZCQyxNQUFNLENBQUNDLE9BQVAsQ0FBZSxpQkFBZixDQUE3QjtBQUNBOztBQUVELElBQUlOLE1BQU0sQ0FBQ08sUUFBWCxFQUFxQjtBQUNwQlAsUUFBTSxDQUFDUSxPQUFQLENBQWUsWUFBVztBQUN6QkMsY0FBVSxDQUFDLFlBQVc7QUFDckJDLE9BQUMsQ0FBQyx3QkFBRCxDQUFELENBQTRCQyxPQUE1QixDQUFvQyxHQUFwQyxFQUF5QyxZQUFXO0FBQUVELFNBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUUsTUFBUjtBQUFtQixPQUF6RTtBQUNBLEtBRlMsRUFFUCxHQUZPLENBQVY7QUFHQSxHQUpEO0FBS0EsQzs7Ozs7Ozs7Ozs7QUNaREMsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFBQ0MsU0FBTyxFQUFDLE1BQUlBO0FBQWIsQ0FBZDtBQUFxQyxJQUFJQyxLQUFKO0FBQVVILE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLGNBQVosRUFBMkI7QUFBQ0QsT0FBSyxDQUFDRSxDQUFELEVBQUc7QUFBQ0YsU0FBSyxHQUFDRSxDQUFOO0FBQVE7O0FBQWxCLENBQTNCLEVBQStDLENBQS9DO0FBQWtELElBQUlDLEtBQUo7QUFBVU4sTUFBTSxDQUFDSSxJQUFQLENBQVksWUFBWixFQUF5QjtBQUFDRSxPQUFLLENBQUNELENBQUQsRUFBRztBQUFDQyxTQUFLLEdBQUNELENBQU47QUFBUTs7QUFBbEIsQ0FBekIsRUFBNkMsQ0FBN0M7QUFJcEcsTUFBTUgsT0FBTyxHQUFHLElBQUlDLEtBQUssQ0FBQ0ksVUFBVixDQUFxQixtQkFBckIsQ0FBaEI7QUFFUEwsT0FBTyxDQUFDTSxLQUFSLENBQWM7QUFFYkMsUUFBTSxFQUFFLFlBQVc7QUFBQyxXQUFPLElBQVA7QUFBWSxHQUZuQjtBQUliVixRQUFNLEVBQUUsWUFBVztBQUFDLFdBQU8sSUFBUDtBQUFZLEdBSm5CO0FBTWJXLFFBQU0sRUFBRSxZQUFXO0FBQUMsV0FBTyxJQUFQO0FBQVk7QUFObkIsQ0FBZDs7QUFTQSxJQUFHdkIsTUFBTSxDQUFDQyxRQUFWLEVBQW9CO0FBRW5CRCxRQUFNLENBQUN3QixPQUFQLENBQWUsU0FBZixFQUEwQixVQUFTQyxPQUFULEVBQWtCO0FBQzNDLFdBQU9WLE9BQU8sQ0FBQ1csSUFBUixDQUFhO0FBQUNELGFBQU8sRUFBRUE7QUFBVixLQUFiLENBQVA7QUFDQSxHQUZEO0FBR0E7O0FBRUR6QixNQUFNLENBQUMyQixPQUFQLENBQWU7QUFFZEMsY0FBWSxFQUFFLFVBQVNDLElBQVQsRUFBZUosT0FBZixFQUF3QjtBQUNyQ1YsV0FBTyxDQUFDTyxNQUFSLENBQWU7QUFBQ08sVUFBSSxFQUFFQSxJQUFQO0FBQWFKLGFBQU8sRUFBRUEsT0FBdEI7QUFBK0JLLFdBQUssRUFBRTtBQUF0QyxLQUFmLEVBQXdELFVBQVNDLEtBQVQsRUFBZ0I7QUFDdkUsVUFBSUEsS0FBSixFQUFXO0FBQ1ZDLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLG9DQUFrQ0YsS0FBSyxDQUFDRyxPQUFwRDtBQUNBLE9BRkQsTUFFTztBQUNORixlQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBO0FBQ0QsS0FORDtBQU9BLEdBVmE7QUFXZEUsWUFBVSxFQUFFLFVBQVNWLE9BQVQsRUFBa0JXLE9BQWxCLEVBQTJCQyxPQUEzQixFQUFvQztBQUMvQyxRQUFJQyxNQUFNLEdBQUd2QixPQUFPLENBQUN3QixPQUFSLENBQWdCO0FBQUNWLFVBQUksRUFBRU8sT0FBUDtBQUFnQlgsYUFBTyxFQUFFQTtBQUF6QixLQUFoQixDQUFiO0FBQ0FWLFdBQU8sQ0FBQ1EsTUFBUixDQUFlZSxNQUFNLENBQUNFLEdBQXRCLEVBQTJCO0FBQUNDLFVBQUksRUFBRTtBQUFDWixZQUFJLEVBQUNRO0FBQU47QUFBUCxLQUEzQixFQUFtRCxVQUFTTixLQUFULEVBQWdCO0FBQ2xFLFVBQUlBLEtBQUosRUFBVztBQUNWQyxlQUFPLENBQUNDLEdBQVIsQ0FBWSx1Q0FBcUNGLEtBQUssQ0FBQ0csT0FBdkQ7QUFDQSxPQUZELE1BR0s7QUFDSmYsYUFBSyxDQUFDSSxNQUFOLENBQWE7QUFBQ0UsaUJBQU8sRUFBQ0EsT0FBVDtBQUFrQmEsZ0JBQU0sRUFBRUY7QUFBMUIsU0FBYixFQUFnRDtBQUFDSyxjQUFJLEVBQUU7QUFBQ0gsa0JBQU0sRUFBRUQ7QUFBVDtBQUFQLFNBQWhELEVBQTJFO0FBQUNLLGVBQUssRUFBRTtBQUFSLFNBQTNFLEVBREksQ0FDdUY7QUFDM0Y7QUFDRCxLQVBEO0FBUUE7QUFyQmEsQ0FBZixFOzs7Ozs7Ozs7OztBQ3RCQTdCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQUM2QixZQUFVLEVBQUMsTUFBSUE7QUFBaEIsQ0FBZDtBQUEyQyxJQUFJM0IsS0FBSjtBQUFVSCxNQUFNLENBQUNJLElBQVAsQ0FBWSxjQUFaLEVBQTJCO0FBQUNELE9BQUssQ0FBQ0UsQ0FBRCxFQUFHO0FBQUNGLFNBQUssR0FBQ0UsQ0FBTjtBQUFROztBQUFsQixDQUEzQixFQUErQyxDQUEvQztBQUFrRCxJQUFJQyxLQUFKO0FBQVVOLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLFlBQVosRUFBeUI7QUFBQ0UsT0FBSyxDQUFDRCxDQUFELEVBQUc7QUFBQ0MsU0FBSyxHQUFDRCxDQUFOO0FBQVE7O0FBQWxCLENBQXpCLEVBQTZDLENBQTdDO0FBSTFHLE1BQU15QixVQUFVLEdBQUcsSUFBSTNCLEtBQUssQ0FBQ0ksVUFBVixDQUFxQixzQkFBckIsQ0FBbkI7QUFFUHVCLFVBQVUsQ0FBQ3RCLEtBQVgsQ0FBaUI7QUFFaEJDLFFBQU0sRUFBRSxZQUFXO0FBQUMsV0FBTyxJQUFQO0FBQVksR0FGaEI7QUFJaEJWLFFBQU0sRUFBRSxZQUFXO0FBQUMsV0FBTyxJQUFQO0FBQVksR0FKaEI7QUFNaEJXLFFBQU0sRUFBRSxZQUFXO0FBQUMsV0FBTyxJQUFQO0FBQVk7QUFOaEIsQ0FBakI7O0FBVUEsSUFBR3ZCLE1BQU0sQ0FBQ0MsUUFBVixFQUFvQjtBQUVuQkQsUUFBTSxDQUFDd0IsT0FBUCxDQUFlLFlBQWYsRUFBNkIsVUFBU0MsT0FBVCxFQUFrQjtBQUM5QyxXQUFPa0IsVUFBVSxDQUFDakIsSUFBWCxDQUFnQjtBQUFDRCxhQUFPLEVBQUVBO0FBQVYsS0FBaEIsQ0FBUDtBQUNBLEdBRkQ7QUFHQTs7QUFFRHpCLE1BQU0sQ0FBQzJCLE9BQVAsQ0FBZTtBQUVkaUIsZ0JBQWMsRUFBRSxVQUFTQyxJQUFULEVBQWVoQixJQUFmLEVBQXFCSixPQUFyQixFQUE4QjtBQUM3Q2tCLGNBQVUsQ0FBQ3JCLE1BQVgsQ0FBa0I7QUFBQ3VCLFVBQUksRUFBRUEsSUFBUDtBQUFhaEIsVUFBSSxFQUFFQSxJQUFuQjtBQUF5QkosYUFBTyxFQUFFQSxPQUFsQztBQUEyQ0ssV0FBSyxFQUFFO0FBQWxELEtBQWxCO0FBQ0EsR0FKYTtBQUtkZ0IsY0FBWSxFQUFFLFVBQVNyQixPQUFULEVBQWtCb0IsSUFBbEIsRUFBd0JULE9BQXhCLEVBQWlDQyxPQUFqQyxFQUEwQztBQUN2RCxRQUFJVSxRQUFRLEdBQUdKLFVBQVUsQ0FBQ0osT0FBWCxDQUFtQjtBQUFDTSxVQUFJLEVBQUVBLElBQVA7QUFBYWhCLFVBQUksRUFBRU8sT0FBbkI7QUFBNEJYLGFBQU8sRUFBRUE7QUFBckMsS0FBbkIsQ0FBZjtBQUNBa0IsY0FBVSxDQUFDcEIsTUFBWCxDQUFrQndCLFFBQVEsQ0FBQ1AsR0FBM0IsRUFBZ0M7QUFBQ0MsVUFBSSxFQUFFO0FBQUNaLFlBQUksRUFBQ1E7QUFBTjtBQUFQLEtBQWhDLEVBQXdELFVBQVNOLEtBQVQsRUFBZ0I7QUFDdkUsVUFBSUEsS0FBSixFQUFXO0FBQ1ZDLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLHlDQUF1Q0YsS0FBSyxDQUFDRyxPQUF6RDtBQUNBLE9BRkQsTUFHSztBQUNKZixhQUFLLENBQUNJLE1BQU4sQ0FBYTtBQUFDRSxpQkFBTyxFQUFDQSxPQUFUO0FBQWtCb0IsY0FBSSxFQUFFQSxJQUF4QjtBQUE4QkUsa0JBQVEsRUFBRVg7QUFBeEMsU0FBYixFQUE4RDtBQUFDSyxjQUFJLEVBQUU7QUFBQ00sb0JBQVEsRUFBRVY7QUFBWDtBQUFQLFNBQTlELEVBQTJGO0FBQUNLLGVBQUssRUFBRTtBQUFSLFNBQTNGLEVBREksQ0FDdUc7QUFDM0c7QUFDRCxLQVBEO0FBUUEsR0FmYTtBQWdCZE0sZ0JBQWMsRUFBRSxVQUFTSCxJQUFULEVBQWVoQixJQUFmLEVBQXFCSixPQUFyQixFQUE4QjtBQUM3QyxRQUFJc0IsUUFBUSxHQUFHSixVQUFVLENBQUNKLE9BQVgsQ0FBbUI7QUFBQ00sVUFBSSxFQUFFQSxJQUFQO0FBQWFoQixVQUFJLEVBQUVBLElBQW5CO0FBQXlCSixhQUFPLEVBQUVBO0FBQWxDLEtBQW5CLENBQWY7QUFDQWtCLGNBQVUsQ0FBQy9CLE1BQVgsQ0FBa0JtQyxRQUFRLENBQUNQLEdBQTNCLEVBQWdDLFVBQVNULEtBQVQsRUFBZ0I7QUFDL0MsVUFBSUEsS0FBSixFQUFXO0FBQ1ZDLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLG9DQUFrQ0YsS0FBSyxDQUFDRyxPQUFwRDtBQUNBLE9BRkQsTUFHSztBQUNKZixhQUFLLENBQUNJLE1BQU4sQ0FBYTtBQUFDc0IsY0FBSSxFQUFFQSxJQUFQO0FBQWFwQixpQkFBTyxFQUFDQSxPQUFyQjtBQUE4QnNCLGtCQUFRLEVBQUVsQjtBQUF4QyxTQUFiLEVBQTJEO0FBQUNvQixnQkFBTSxFQUFFO0FBQUNGLG9CQUFRLEVBQUM7QUFBVjtBQUFULFNBQTNELEVBQW9GO0FBQUNMLGVBQUssRUFBRTtBQUFSLFNBQXBGLEVBREksQ0FDZ0c7QUFDcEc7QUFDRCxLQVBEO0FBUUE7QUExQmEsQ0FBZixFOzs7Ozs7Ozs7OztBQ3ZCQTdCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQUNvQyxPQUFLLEVBQUMsTUFBSUE7QUFBWCxDQUFkO0FBQWlDLElBQUlsQyxLQUFKO0FBQVVILE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLGNBQVosRUFBMkI7QUFBQ0QsT0FBSyxDQUFDRSxDQUFELEVBQUc7QUFBQ0YsU0FBSyxHQUFDRSxDQUFOO0FBQVE7O0FBQWxCLENBQTNCLEVBQStDLENBQS9DO0FBRXBDLE1BQU1nQyxLQUFLLEdBQUcsSUFBSWxDLEtBQUssQ0FBQ0ksVUFBVixDQUFxQixpQkFBckIsQ0FBZDtBQUVQOEIsS0FBSyxDQUFDN0IsS0FBTixDQUFZO0FBRVhDLFFBQU0sRUFBRSxZQUFXO0FBQUMsV0FBTyxJQUFQO0FBQVksR0FGckI7QUFJWFYsUUFBTSxFQUFFLFlBQVc7QUFBQyxXQUFPLElBQVA7QUFBWSxHQUpyQjtBQU1YVyxRQUFNLEVBQUUsWUFBVztBQUFDLFdBQU8sSUFBUDtBQUFZO0FBTnJCLENBQVosRTs7Ozs7Ozs7Ozs7QUNKQVYsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFBQ3FDLE9BQUssRUFBQyxNQUFJQTtBQUFYLENBQWQ7QUFBaUMsSUFBSW5DLEtBQUo7QUFBVUgsTUFBTSxDQUFDSSxJQUFQLENBQVksY0FBWixFQUEyQjtBQUFDRCxPQUFLLENBQUNFLENBQUQsRUFBRztBQUFDRixTQUFLLEdBQUNFLENBQU47QUFBUTs7QUFBbEIsQ0FBM0IsRUFBK0MsQ0FBL0M7QUFFcEMsTUFBTWlDLEtBQUssR0FBRyxJQUFJbkMsS0FBSyxDQUFDSSxVQUFWLENBQXFCLGlCQUFyQixDQUFkO0FBR1ArQixLQUFLLENBQUM5QixLQUFOLENBQVk7QUFFVEMsUUFBTSxFQUFFLFlBQVc7QUFBQyxXQUFPLElBQVA7QUFBWSxHQUZ2QjtBQUlWVixRQUFNLEVBQUUsWUFBVztBQUFDLFdBQU8sSUFBUDtBQUFZLEdBSnRCO0FBTVhXLFFBQU0sRUFBRSxZQUFXO0FBQUMsV0FBTyxJQUFQO0FBQVk7QUFOckIsQ0FBWjs7QUFTQSxJQUFHdkIsTUFBTSxDQUFDQyxRQUFWLEVBQW9CO0FBRW5CRCxRQUFNLENBQUN3QixPQUFQLENBQWUsTUFBZixFQUF1QixVQUFTNEIsTUFBVCxFQUFpQjtBQUN4QyxXQUFPRCxLQUFLLENBQUN6QixJQUFOLENBQVc7QUFBQ2MsU0FBRyxFQUFDWTtBQUFMLEtBQVgsQ0FBUDtBQUNBLEdBRkE7QUFJRHBELFFBQU0sQ0FBQ3dCLE9BQVAsQ0FBZSxPQUFmLEVBQXdCLFVBQVNDLE9BQVQsRUFBa0I7QUFDekMsV0FBTzBCLEtBQUssQ0FBQ3pCLElBQU4sQ0FBVztBQUFDRCxhQUFPLEVBQUVBO0FBQVYsS0FBWCxDQUFQO0FBQ0EsR0FGRDtBQUlBekIsUUFBTSxDQUFDd0IsT0FBUCxDQUFlLFVBQWYsRUFBMkIsWUFBVztBQUNyQyxXQUFPMkIsS0FBSyxDQUFDekIsSUFBTixDQUFXLEVBQVgsQ0FBUDtBQUNBLEdBRkQ7QUFJQTFCLFFBQU0sQ0FBQ3dCLE9BQVAsQ0FBZSxPQUFmLEVBQXdCLFVBQVNDLE9BQVQsRUFBa0I7QUFDekNPLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVo7QUFDQSxXQUFPa0IsS0FBSyxDQUFDekIsSUFBTixDQUFXO0FBQUNELGFBQU8sRUFBRUE7QUFBVixLQUFYLENBQVA7QUFDQSxHQUhEOztBQUtDLE1BQUk0QixFQUFFLEdBQUdDLEdBQUcsQ0FBQ0MsT0FBSixDQUFZLElBQVosQ0FBVDs7QUFDQSxNQUFJQyxNQUFNLEdBQUdGLEdBQUcsQ0FBQ0MsT0FBSixDQUFZLFFBQVosQ0FBYixDQXBCbUIsQ0FvQmlCOzs7QUFDcEMsTUFBSUUsU0FBUyxHQUFHekQsTUFBTSxDQUFDMEQsUUFBUCxDQUFnQkQsU0FBaEM7QUFFQXpELFFBQU0sQ0FBQzJCLE9BQVAsQ0FBZTtBQUVkZ0MsY0FBVSxFQUFFLFVBQVNDLElBQVQsRUFBZTtBQUUxQixVQUFJQSxJQUFJLENBQUNmLElBQUwsSUFBYSxRQUFqQixFQUEyQjtBQUMxQlcsY0FBTSxDQUFDQyxTQUFTLEdBQUMsR0FBVixHQUFjRyxJQUFJLENBQUNuQyxPQUFuQixHQUEyQixHQUEzQixHQUErQm1DLElBQUksQ0FBQ2YsSUFBcEMsR0FBeUMsR0FBekMsR0FBNkNlLElBQUksQ0FBQ1IsTUFBbkQsRUFBMkQsVUFBVVMsR0FBVixFQUFlO0FBQUM3QixpQkFBTyxDQUFDQyxHQUFSLENBQVk0QixHQUFaO0FBQWlCLFNBQTVGLENBQU4sQ0FERCxLQUVLO0FBQ0RSLFVBQUUsQ0FBQ1MsVUFBSCxDQUFjTCxTQUFTLEdBQUUsR0FBWCxHQUFlRyxJQUFJLENBQUNHLFFBQWxDLEVBQTRDLFVBQVVGLEdBQVYsRUFBZTtBQUFDN0IsaUJBQU8sQ0FBQ0MsR0FBUixDQUFZNEIsR0FBWjtBQUFpQixTQUE3RTtBQUNGO0FBUlcsR0FBZjtBQVVBLEM7Ozs7Ozs7Ozs7O0FDL0NEaEQsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFBQ0ssT0FBSyxFQUFDLE1BQUlBO0FBQVgsQ0FBZDtBQUFpQyxJQUFJSCxLQUFKO0FBQVVILE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLGNBQVosRUFBMkI7QUFBQ0QsT0FBSyxDQUFDRSxDQUFELEVBQUc7QUFBQ0YsU0FBSyxHQUFDRSxDQUFOO0FBQVE7O0FBQWxCLENBQTNCLEVBQStDLENBQS9DO0FBQWtELElBQUlILE9BQUo7QUFBWUYsTUFBTSxDQUFDSSxJQUFQLENBQVksY0FBWixFQUEyQjtBQUFDRixTQUFPLENBQUNHLENBQUQsRUFBRztBQUFDSCxXQUFPLEdBQUNHLENBQVI7QUFBVTs7QUFBdEIsQ0FBM0IsRUFBbUQsQ0FBbkQ7QUFBc0QsSUFBSThDLE1BQUo7QUFBV25ELE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLGFBQVosRUFBMEI7QUFBQytDLFFBQU0sQ0FBQzlDLENBQUQsRUFBRztBQUFDOEMsVUFBTSxHQUFDOUMsQ0FBUDtBQUFTOztBQUFwQixDQUExQixFQUFnRCxDQUFoRDtBQUFtRCxJQUFJeUIsVUFBSjtBQUFlOUIsTUFBTSxDQUFDSSxJQUFQLENBQVksaUJBQVosRUFBOEI7QUFBQzBCLFlBQVUsQ0FBQ3pCLENBQUQsRUFBRztBQUFDeUIsY0FBVSxHQUFDekIsQ0FBWDtBQUFhOztBQUE1QixDQUE5QixFQUE0RCxDQUE1RDtBQUErRCxJQUFJaUMsS0FBSjtBQUFVdEMsTUFBTSxDQUFDSSxJQUFQLENBQVksWUFBWixFQUF5QjtBQUFDa0MsT0FBSyxDQUFDakMsQ0FBRCxFQUFHO0FBQUNpQyxTQUFLLEdBQUNqQyxDQUFOO0FBQVE7O0FBQWxCLENBQXpCLEVBQTZDLENBQTdDO0FBUTlTLE1BQU1DLEtBQUssR0FBRyxJQUFJSCxLQUFLLENBQUNJLFVBQVYsQ0FBcUIsaUJBQXJCLENBQWQ7QUFHUEQsS0FBSyxDQUFDRSxLQUFOLENBQVk7QUFDWEMsUUFBTSxFQUFFLFlBQVc7QUFBQyxXQUFPLElBQVA7QUFBYSxHQUR0QjtBQUdYVixRQUFNLEVBQUUsWUFBVztBQUFDLFdBQU8sSUFBUDtBQUFhLEdBSHRCO0FBS1hXLFFBQU0sRUFBRSxZQUFXO0FBQUMsV0FBTyxJQUFQO0FBQWE7QUFMdEIsQ0FBWjs7QUFRQSxJQUFHdkIsTUFBTSxDQUFDTyxRQUFWLEVBQW9CO0FBQ25CMEQsUUFBTSxHQUFHLElBQUlqRCxLQUFLLENBQUNJLFVBQVYsQ0FBcUIsUUFBckIsQ0FBVCxDQURtQixDQUNzQjs7QUFDekM4QyxjQUFZLEdBQUcsSUFBSWxELEtBQUssQ0FBQ0ksVUFBVixDQUFxQixjQUFyQixDQUFmO0FBQ0ErQyxhQUFXLEdBQUcsSUFBSW5ELEtBQUssQ0FBQ0ksVUFBVixDQUFxQixhQUFyQixDQUFkO0FBQ0FnRCxjQUFZLEdBQUcsSUFBSXBELEtBQUssQ0FBQ0ksVUFBVixDQUFxQixjQUFyQixDQUFmO0FBQ0FpRCxnQkFBYyxHQUFHLElBQUlyRCxLQUFLLENBQUNJLFVBQVYsQ0FBcUIsZ0JBQXJCLENBQWpCO0FBQ0E7O0FBRUQsSUFBR3BCLE1BQU0sQ0FBQ0MsUUFBVixFQUFvQjtBQUVwQkQsUUFBTSxDQUFDd0IsT0FBUCxDQUFlLE1BQWYsRUFBdUIsVUFBUzhDLE1BQVQsRUFBaUI7QUFDdkNDLFNBQUssQ0FBQ0QsTUFBRCxFQUFTRSxNQUFULENBQUw7QUFDQSxXQUFPckQsS0FBSyxDQUFDTyxJQUFOLENBQVc7QUFBQ2MsU0FBRyxFQUFFOEI7QUFBTixLQUFYLENBQVA7QUFDQSxHQUhEO0FBS0F0RSxRQUFNLENBQUN3QixPQUFQLENBQWUsV0FBZixFQUE0QixVQUFTQyxPQUFULEVBQWtCO0FBQzdDOEMsU0FBSyxDQUFDOUMsT0FBRCxFQUFVK0MsTUFBVixDQUFMO0FBQ0EsV0FBT3JELEtBQUssQ0FBQ08sSUFBTixDQUFXO0FBQUNELGFBQU8sRUFBRUEsT0FBVjtBQUFtQm9CLFVBQUksRUFBQztBQUF4QixLQUFYLEVBQTJDO0FBQUM0QixVQUFJLEVBQUU7QUFBQ0MsaUJBQVMsRUFBRTtBQUFaO0FBQVAsS0FBM0MsQ0FBUDtBQUNBLEdBSEQ7QUFLQTFFLFFBQU0sQ0FBQ3dCLE9BQVAsQ0FBZSxlQUFmLEVBQWdDLFVBQVNDLE9BQVQsRUFBa0I7QUFDakQ4QyxTQUFLLENBQUM5QyxPQUFELEVBQVUrQyxNQUFWLENBQUw7QUFDQSxXQUFPckQsS0FBSyxDQUFDTyxJQUFOLENBQVc7QUFBQ0QsYUFBTyxFQUFFQSxPQUFWO0FBQW1Cb0IsVUFBSSxFQUFDO0FBQXhCLEtBQVgsRUFBK0M7QUFBQzRCLFVBQUksRUFBRTtBQUFDQyxpQkFBUyxFQUFFLENBQUM7QUFBYjtBQUFQLEtBQS9DLENBQVA7QUFDQSxHQUhEO0FBS0ExRSxRQUFNLENBQUN3QixPQUFQLENBQWUsZ0JBQWYsRUFBaUMsVUFBU0MsT0FBVCxFQUFrQjtBQUNsRDhDLFNBQUssQ0FBQzlDLE9BQUQsRUFBVStDLE1BQVYsQ0FBTDtBQUNBLFdBQU9yRCxLQUFLLENBQUNPLElBQU4sQ0FBVztBQUFDRCxhQUFPLEVBQUVBLE9BQVY7QUFBbUJvQixVQUFJLEVBQUM7QUFBeEIsS0FBWCxDQUFQO0FBQ0EsR0FIRDtBQUtBN0MsUUFBTSxDQUFDd0IsT0FBUCxDQUFlLE9BQWYsRUFBd0IsVUFBU21ELE9BQVQsRUFBdUM7QUFBQSxRQUFyQkMsSUFBcUIsdUVBQWQsQ0FBYztBQUFBLFFBQVhDLEtBQVcsdUVBQUgsQ0FBRztBQUM5RCxXQUFPMUQsS0FBSyxDQUFDTyxJQUFOLENBQVdpRCxPQUFYLEVBQW9CO0FBQUNGLFVBQUksRUFBRTtBQUFDQyxpQkFBUyxFQUFDO0FBQVgsT0FBUDtBQUFxQkUsVUFBSSxFQUFDQSxJQUExQjtBQUErQkMsV0FBSyxFQUFDQTtBQUFyQyxLQUFwQixDQUFQO0FBQ0EsR0FGRDtBQU1DN0UsUUFBTSxDQUFDd0IsT0FBUCxDQUFlLHFCQUFmLEVBQXNDLFVBQVVDLE9BQVYsRUFBbUI7QUFDekQsUUFBSXFELElBQUksR0FBRyxJQUFYO0FBQ0EsUUFBSUMsY0FBYyxHQUFHLENBQXJCO0FBQ0EsUUFBSUMsWUFBWSxHQUFHLElBQW5CO0FBRUEsUUFBSUMsTUFBTSxHQUFHOUQsS0FBSyxDQUFDTyxJQUFOLENBQVc7QUFBQ0QsYUFBTyxFQUFFQSxPQUFWO0FBQW1Cb0IsVUFBSSxFQUFDO0FBQXhCLEtBQVgsRUFBZ0RxQyxjQUFoRCxDQUErRDtBQUMzRUMsV0FBSyxFQUFFLFVBQVVDLEdBQVYsRUFBZUMsR0FBZixFQUFvQjtBQUMxQk4sc0JBQWM7O0FBQ2QsWUFBSSxDQUFDQyxZQUFMLEVBQW1CO0FBQ2xCRixjQUFJLENBQUNRLE9BQUwsQ0FBYSxnQkFBYixFQUErQjdELE9BQS9CLEVBQXdDO0FBQUM4RCxpQkFBSyxFQUFFUjtBQUFSLFdBQXhDLEVBRGtCLENBQ2lEO0FBQ25FO0FBQ0QsT0FOMEU7QUFPM0VTLGFBQU8sRUFBRSxVQUFVSixHQUFWLEVBQWVDLEdBQWYsRUFBb0I7QUFDNUJOLHNCQUFjO0FBQ2RELFlBQUksQ0FBQ1EsT0FBTCxDQUFhLGdCQUFiLEVBQStCN0QsT0FBL0IsRUFBd0M7QUFBQzhELGVBQUssRUFBRVI7QUFBUixTQUF4QyxFQUY0QixDQUV1QztBQUNuRTtBQVYwRSxLQUEvRCxDQUFiO0FBYUFDLGdCQUFZLEdBQUcsS0FBZixDQWxCeUQsQ0FvQnpEO0FBQ0E7QUFDQTs7QUFDQUYsUUFBSSxDQUFDSyxLQUFMLENBQVcsZ0JBQVgsRUFBNkIxRCxPQUE3QixFQUFzQztBQUFDOEQsV0FBSyxFQUFFUjtBQUFSLEtBQXRDLEVBdkJ5RCxDQXlCekQ7O0FBQ0FELFFBQUksQ0FBQ1csS0FBTCxHQTFCeUQsQ0E0QnpEOztBQUNBWCxRQUFJLENBQUNZLE1BQUwsQ0FBWSxZQUFZO0FBQ3ZCVCxZQUFNLENBQUNVLElBQVA7QUFDQSxLQUZEO0FBR0EsR0FoQ0E7QUFpQ0EsQyxDQUVEO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUEsSUFBRzNGLE1BQU0sQ0FBQ0MsUUFBVixFQUFvQjtBQUVuQmtCLE9BQUssQ0FBQ3lFLEtBQU4sQ0FBWWhGLE1BQVosQ0FBbUIsVUFBVWlGLE1BQVYsRUFBa0JULEdBQWxCLEVBQXVCO0FBRXhDO0FBQ0EsUUFBSWhDLE1BQU0sR0FBR2dDLEdBQUcsQ0FBQ2hDLE1BQWpCO0FBQ0EsUUFBSTBDLE9BQU8sR0FBR1YsR0FBRyxDQUFDVSxPQUFsQjs7QUFDQSxRQUFJMUMsTUFBSixFQUFZO0FBQ1hELFdBQUssQ0FBQ3ZDLE1BQU4sQ0FBYTtBQUFDd0MsY0FBTSxFQUFDQTtBQUFSLE9BQWI7QUFDQXBELFlBQU0sQ0FBQytGLElBQVAsQ0FBWSxZQUFaLEVBQXlCWCxHQUF6QjtBQUNBLEtBUnVDLENBVXhDOzs7QUFDQSxRQUFJQSxHQUFHLENBQUN2QyxJQUFKLElBQVksVUFBaEIsRUFBNEI7QUFDM0IsVUFBSXVDLEdBQUcsQ0FBQ3JDLFFBQVIsRUFBa0I7QUFDakIsWUFBSUEsUUFBUSxHQUFHSixVQUFVLENBQUNKLE9BQVgsQ0FBbUI7QUFBQ2QsaUJBQU8sRUFBRTJELEdBQUcsQ0FBQzNELE9BQWQ7QUFBdUJvQixjQUFJLEVBQUMsVUFBNUI7QUFBd0NoQixjQUFJLEVBQUV1RCxHQUFHLENBQUNyQztBQUFsRCxTQUFuQixDQUFmO0FBQ0EsWUFBSUEsUUFBSixFQUNDSixVQUFVLENBQUNwQixNQUFYLENBQWtCd0IsUUFBUSxDQUFDUCxHQUEzQixFQUFnQztBQUFDd0QsY0FBSSxFQUFFO0FBQUNsRSxpQkFBSyxFQUFFLENBQUM7QUFBVDtBQUFQLFNBQWhDLEVBSGdCLENBR3NDO0FBQ3ZEO0FBQ0Q7QUFDRixHQWxCRDtBQW1CQTs7QUFHRDlCLE1BQU0sQ0FBQzJCLE9BQVAsQ0FBZTtBQUVkc0UsZ0JBQWMsRUFBRSxVQUFTQyxJQUFULEVBQWU7QUFDOUIvRSxTQUFLLENBQUNJLE1BQU4sQ0FBYTtBQUFDaUIsU0FBRyxFQUFDMEQsSUFBSSxDQUFDQyxhQUFWO0FBQXdCLHFCQUFjRCxJQUFJLENBQUNFO0FBQTNDLEtBQWIsRUFBMkU7QUFBQ0MsV0FBSyxFQUFFO0FBQUMsNEJBQW9CSCxJQUFJLENBQUM1RDtBQUExQjtBQUFSLEtBQTNFO0FBQ0EsR0FKYTtBQUtkZ0UsbUJBQWlCLEVBQUUsVUFBU0osSUFBVCxFQUFlO0FBQ2pDL0UsU0FBSyxDQUFDSSxNQUFOLENBQWE7QUFBQ2lCLFNBQUcsRUFBQzBELElBQUksQ0FBQ0MsYUFBVjtBQUF3QixxQkFBY0QsSUFBSSxDQUFDRTtBQUEzQyxLQUFiLEVBQTJFO0FBQUNHLFdBQUssRUFBRTtBQUFDLDRCQUFvQkwsSUFBSSxDQUFDNUQ7QUFBMUI7QUFBUixLQUEzRTtBQUNBLEdBUGE7QUFRZGtFLGdCQUFjLEVBQUUsVUFBU0MsY0FBVCxFQUF5QjtBQUN4Q2xDLFNBQUssQ0FBQ2tDLGNBQWMsQ0FBQ2hGLE9BQWhCLEVBQXlCK0MsTUFBekIsQ0FBTCxDQUR3QyxDQUd4QztBQUNDOztBQUVEWixRQUFJLEdBQUc4QyxDQUFDLENBQUNDLE1BQUYsQ0FBU0YsY0FBVCxFQUF5QjtBQUMvQi9CLGVBQVMsRUFBRWtDLElBQUksQ0FBQ0MsR0FBTCxFQURvQjtBQUUvQkMsV0FBSyxFQUFFM0YsS0FBSyxDQUFDTyxJQUFOLENBQVc7QUFBQ0QsZUFBTyxFQUFFZ0YsY0FBYyxDQUFDaEYsT0FBekI7QUFBa0NvQixZQUFJLEVBQUU0RCxjQUFjLENBQUM1RDtBQUF2RCxPQUFYLEVBQXlFMEMsS0FBekUsRUFGd0IsQ0FHL0I7QUFDQTs7QUFKK0IsS0FBekIsQ0FBUDtBQU9BLFFBQUl3QixLQUFLLEdBQUcvQyxNQUFNLENBQUN6QixPQUFQLENBQWVrRSxjQUFjLENBQUNoRixPQUE5QixDQUFaO0FBQ0FtQyxRQUFJLENBQUNwQixHQUFMLEdBQVdyQixLQUFLLENBQUNHLE1BQU4sQ0FBYXNDLElBQWIsQ0FBWDtBQUNBLFdBQU9BLElBQUksQ0FBQ3BCLEdBQVo7QUFDQSxHQXhCYTtBQXlCZHdFLFlBQVUsRUFBRSxVQUFTUCxjQUFULEVBQXlCO0FBQ3BDbEMsU0FBSyxDQUFDa0MsY0FBYyxDQUFDaEYsT0FBaEIsRUFBeUIrQyxNQUF6QixDQUFMLENBRG9DLENBR3BDO0FBQ0M7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQSxRQUFJeEUsTUFBTSxDQUFDQyxRQUFYLEVBQ0MyRCxJQUFJLEdBQUc4QyxDQUFDLENBQUNDLE1BQUYsQ0FBU0YsY0FBVCxFQUF5QjtBQUFDUSxjQUFRLEVBQUUsS0FBS0MsVUFBTCxDQUFnQkM7QUFBM0IsS0FBekIsQ0FBUDtBQUVELFFBQUlKLEtBQUssR0FBRy9DLE1BQU0sQ0FBQ3pCLE9BQVAsQ0FBZWtFLGNBQWMsQ0FBQ2hGLE9BQTlCLENBQVo7QUFFQXNCLFlBQVEsR0FBR0osVUFBVSxDQUFDSixPQUFYLENBQW1CO0FBQUNkLGFBQU8sRUFBRWdGLGNBQWMsQ0FBQ2hGLE9BQXpCO0FBQWtDSSxVQUFJLEVBQUU0RSxjQUFjLENBQUMxRDtBQUF2RCxLQUFuQixDQUFYLENBdEJvQyxDQXNCNkQ7O0FBQ2pHSixjQUFVLENBQUNwQixNQUFYLENBQWtCd0IsUUFBbEIsRUFBNEI7QUFBQ2lELFVBQUksRUFBRTtBQUFDbEUsYUFBSyxFQUFFO0FBQVI7QUFBUCxLQUE1QjtBQUVBOEIsUUFBSSxDQUFDcEIsR0FBTCxHQUFXckIsS0FBSyxDQUFDRyxNQUFOLENBQWFzQyxJQUFiLENBQVg7QUFDQSxXQUFPQSxJQUFJLENBQUNwQixHQUFaO0FBQ0E7QUFwRGEsQ0FBZixFOzs7Ozs7Ozs7OztBQzVOQTNCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQUNrRCxRQUFNLEVBQUMsTUFBSUE7QUFBWixDQUFkO0FBQW1DLElBQUloRCxLQUFKO0FBQVVILE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLGNBQVosRUFBMkI7QUFBQ0QsT0FBSyxDQUFDRSxDQUFELEVBQUc7QUFBQ0YsU0FBSyxHQUFDRSxDQUFOO0FBQVE7O0FBQWxCLENBQTNCLEVBQStDLENBQS9DO0FBQWtELElBQUlILE9BQUo7QUFBWUYsTUFBTSxDQUFDSSxJQUFQLENBQVksY0FBWixFQUEyQjtBQUFDRixTQUFPLENBQUNHLENBQUQsRUFBRztBQUFDSCxXQUFPLEdBQUNHLENBQVI7QUFBVTs7QUFBdEIsQ0FBM0IsRUFBbUQsQ0FBbkQ7QUFBc0QsSUFBSWdDLEtBQUo7QUFBVXJDLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLFlBQVosRUFBeUI7QUFBQ2lDLE9BQUssQ0FBQ2hDLENBQUQsRUFBRztBQUFDZ0MsU0FBSyxHQUFDaEMsQ0FBTjtBQUFROztBQUFsQixDQUF6QixFQUE2QyxDQUE3QztBQUFnRCxJQUFJQyxLQUFKO0FBQVVOLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLFlBQVosRUFBeUI7QUFBQ0UsT0FBSyxDQUFDRCxDQUFELEVBQUc7QUFBQ0MsU0FBSyxHQUFDRCxDQUFOO0FBQVE7O0FBQWxCLENBQXpCLEVBQTZDLENBQTdDO0FBTTlOLE1BQU04QyxNQUFNLEdBQUcsSUFBSWhELEtBQUssQ0FBQ0ksVUFBVixDQUFxQixrQkFBckIsQ0FBZjtBQUdQNEMsTUFBTSxDQUFDM0MsS0FBUCxDQUFhO0FBRVo7QUFDQTtBQUVBQyxRQUFNLEVBQUUsVUFBU3VFLE1BQVQsRUFBaUJrQixLQUFqQixFQUF3QjtBQUFFLFdBQU9LLFlBQVksQ0FBQ3ZCLE1BQUQsRUFBU2tCLEtBQVQsQ0FBWixJQUErQk0sT0FBTyxDQUFDeEIsTUFBRCxDQUE3QztBQUF3RCxHQUw5RTtBQU9adEUsUUFBTSxFQUFFLFVBQVNzRSxNQUFULEVBQWlCa0IsS0FBakIsRUFBd0I7QUFBRSxXQUFPSyxZQUFZLENBQUN2QixNQUFELEVBQVNrQixLQUFULENBQVosSUFBK0JNLE9BQU8sQ0FBQ3hCLE1BQUQsQ0FBN0M7QUFBd0QsR0FQOUU7QUFTWmpGLFFBQU0sRUFBRSxVQUFTaUYsTUFBVCxFQUFpQmtCLEtBQWpCLEVBQXdCO0FBQUUsV0FBT0ssWUFBWSxDQUFDdkIsTUFBRCxFQUFTa0IsS0FBVCxDQUFaLElBQStCTSxPQUFPLENBQUN4QixNQUFELENBQTdDO0FBQXdEO0FBVDlFLENBQWI7O0FBYUEsSUFBRzdGLE1BQU0sQ0FBQ0MsUUFBVixFQUFvQjtBQUFHK0IsU0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWixFQUFILENBSXBCO0FBQ0E7QUFDQTs7QUFJQ2pDLFFBQU0sQ0FBQ3dCLE9BQVAsQ0FBZSxPQUFmLEVBQXdCLFVBQVNDLE9BQVQsRUFBa0I7QUFDekNPLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaO0FBQ0FzQyxTQUFLLENBQUM5QyxPQUFELEVBQVUrQyxNQUFWLENBQUw7QUFDQSxXQUFPUixNQUFNLENBQUN0QyxJQUFQLENBQVk7QUFBQ2MsU0FBRyxFQUFFZjtBQUFOLEtBQVosQ0FBUDtBQUNBLEdBSkQ7QUFNQXpCLFFBQU0sQ0FBQ3dCLE9BQVAsQ0FBZSxXQUFmLEVBQTRCLFlBQVc7QUFDdkMsV0FBT3dDLE1BQU0sQ0FBQ3RDLElBQVAsQ0FBWSxFQUFaLENBQVA7QUFDQyxHQUZEO0FBSUExQixRQUFNLENBQUN3QixPQUFQLENBQWUsVUFBZixFQUEyQixZQUFXO0FBQ3RDLFdBQU94QixNQUFNLENBQUNzSCxLQUFQLENBQWE1RixJQUFiLEVBQVA7QUFDRSxHQUZGO0FBSUExQixRQUFNLENBQUN3QixPQUFQLENBQWUsY0FBZixFQUErQixVQUFTcUUsTUFBVCxFQUFpQjtBQUNoRCxXQUFPN0IsTUFBTSxDQUFDdEMsSUFBUCxDQUFZO0FBQUMsNEJBQXFCO0FBQXRCLEtBQVosQ0FBUDtBQUNDLEdBRkQ7QUFJQTFCLFFBQU0sQ0FBQ3dCLE9BQVAsQ0FBZSxXQUFmLEVBQTRCLFVBQVNxRSxNQUFULEVBQWlCO0FBQzVDN0QsV0FBTyxDQUFDQyxHQUFSLENBQVksb0JBQWtCK0IsTUFBTSxDQUFDdEMsSUFBUCxFQUE5QjtBQUNBLFdBQU9zQyxNQUFNLENBQUN0QyxJQUFQLENBQVk7QUFBQ21FLFlBQU0sRUFBQ0E7QUFBUixLQUFaLENBQVA7QUFDQSxHQUhEO0FBS0E3RixRQUFNLENBQUN3QixPQUFQLENBQWUsZUFBZixFQUFnQyxVQUFTK0YsUUFBVCxFQUFtQjtBQUNsRCxXQUFPdkQsTUFBTSxDQUFDdEMsSUFBUCxDQUFZO0FBQUUsYUFBTztBQUFFLGVBQU82RjtBQUFUO0FBQVQsS0FBWixDQUFQO0FBQ0EsR0FGRCxFQWpDbUIsQ0FvQ25CO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFDQTs7QUFHQXZILFFBQU0sQ0FBQzJCLE9BQVAsQ0FBZTtBQUVkNkYsY0FBVSxFQUFFLFVBQVNDLFNBQVQsRUFBb0I7QUFDL0IsVUFBSXpELE1BQU0sQ0FBQ3pCLE9BQVAsQ0FBZTtBQUFDa0YsaUJBQVMsRUFBQ0E7QUFBWCxPQUFmLENBQUosRUFDQyxPQUFPekQsTUFBTSxDQUFDekIsT0FBUCxDQUFlO0FBQUNrRixpQkFBUyxFQUFDQTtBQUFYLE9BQWYsRUFBc0NqRixHQUE3QyxDQURELEtBR0MsT0FBTyxJQUFQO0FBQ0QsS0FQYTtBQVFka0YsY0FBVSxFQUFFLFVBQVNDLE9BQVQsRUFBa0JDLE9BQWxCLEVBQTJCO0FBQ3RDLFVBQUlDLE1BQU0sR0FBRzNFLEtBQUssQ0FBQ1gsT0FBTixDQUFjO0FBQUN1RixZQUFJLEVBQUVIO0FBQVAsT0FBZCxFQUErQm5GLEdBQTVDOztBQUNBVSxXQUFLLENBQUMzQixNQUFOLENBQWFzRyxNQUFiLEVBQW9CO0FBQUNDLFlBQUksRUFBQ0Y7QUFBTixPQUFwQixFQUFvQyxVQUFTN0YsS0FBVCxFQUFnQjtBQUNuRCxZQUFJQSxLQUFKLEVBQVc7QUFDVkMsaUJBQU8sQ0FBQ0MsR0FBUixDQUFZLGdDQUE4QkYsS0FBSyxDQUFDRyxPQUFoRDtBQUNBLFNBRkQsTUFHSztBQUNKRixpQkFBTyxDQUFDQyxHQUFSLENBQVksd0JBQVo7QUFDQTtBQUNELE9BUEQ7QUFRQSxLQWxCYTtBQW1CZDhGLGVBQVcsRUFBRSxVQUFTdEcsT0FBVCxFQUFrQjtBQUM5QnVDLFlBQU0sQ0FBQ3BELE1BQVAsQ0FBY2EsT0FBZCxFQUQ4QixDQUU5QjtBQUNBLEtBdEJhO0FBdUJkdUcsZ0JBQVksRUFBRSxVQUFTbkMsTUFBVCxFQUFpQjtBQUU5QjdCLFlBQU0sQ0FBQ3BELE1BQVAsQ0FBYztBQUFDaUYsY0FBTSxFQUFDQTtBQUFSLE9BQWQ7QUFFQSxLQTNCYTtBQTRCZG9DLGVBQVcsRUFBRSxVQUFTQyxlQUFULEVBQTBCO0FBRXRDM0QsV0FBSyxDQUFDMkQsZUFBRCxFQUFrQjtBQUNyQkMsYUFBSyxFQUFFM0QsTUFEYztBQUVyQjRELFlBQUksRUFBRTVEO0FBRmUsT0FBbEIsQ0FBTDtBQUtBLFVBQUk2RCxTQUFTLEdBQUduRixLQUFLLENBQUN4QixJQUFOLEdBQWE2RCxLQUFiLEVBQWhCO0FBQ0EsVUFBSStDLE1BQU0sR0FBR3RJLE1BQU0sQ0FBQzBELFFBQVAsQ0FBZ0I2RSxNQUFoQixDQUF1QkQsTUFBcEM7QUFDQSxVQUFJRSxVQUFVLEdBQUcsQ0FBakI7QUFFQSxVQUFJSCxTQUFTLElBQUksSUFBakIsRUFDQ0csVUFBVSxHQUFHLENBQWIsQ0FERCxLQUVLLElBQUlILFNBQVMsR0FBRyxJQUFaLElBQW9CQSxTQUFTLElBQUksTUFBckMsRUFDSkcsVUFBVSxHQUFHLENBQWIsQ0FESSxLQUVBLElBQUlILFNBQVMsR0FBRyxNQUFaLElBQXNCQSxTQUFTLElBQUksUUFBdkMsRUFDSkcsVUFBVSxHQUFHLENBQWI7QUFFRCxVQUFJVixJQUFJLEdBQUdRLE1BQU0sR0FBR0csUUFBUSxDQUFDRCxVQUFELENBQTVCOztBQUNBLGFBQU8sT0FBT3RGLEtBQUssQ0FBQ1gsT0FBTixDQUFjO0FBQUN1RixZQUFJLEVBQUVBO0FBQVAsT0FBZCxDQUFQLElBQXNDLFdBQTdDLEVBQ0NBLElBQUksR0FBR1EsTUFBTSxHQUFHRyxRQUFRLENBQUNELFVBQUQsQ0FBeEI7O0FBRUR0RixXQUFLLENBQUM1QixNQUFOLENBQWE7QUFBQ3dHLFlBQUksRUFBQ0EsSUFBTjtBQUFZakMsY0FBTSxFQUFDN0YsTUFBTSxDQUFDNkYsTUFBUDtBQUFuQixPQUFiO0FBRUEsVUFBSUEsTUFBTSxHQUFHN0YsTUFBTSxDQUFDNkYsTUFBUCxFQUFiO0FBQ0E3RCxhQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFheUcsUUFBUSxDQUFDN0MsTUFBVCxFQUF6QjtBQUNHN0QsYUFBTyxDQUFDQyxHQUFSLENBQVksZUFBYWpDLE1BQU0sQ0FBQzZGLE1BQVAsRUFBekI7O0FBRUgsVUFBSWtCLEtBQUssR0FBR0wsQ0FBQyxDQUFDQyxNQUFGLENBQVN1QixlQUFULEVBQTBCO0FBQ3JDckMsY0FBTSxFQUFFQSxNQUQ2QjtBQUVyQzRCLGlCQUFTLEVBQUVLLElBRjBCO0FBR3JDcEQsaUJBQVMsRUFBRSxJQUFJa0MsSUFBSixFQUgwQjtBQUlyQytCLGVBQU8sRUFBRSxJQUo0QjtBQUtyQ0MsaUJBQVMsRUFBRSxJQUwwQjtBQU1yQ0MseUJBQWlCLEVBQUMsSUFObUI7QUFPckNDLGdCQUFRLEVBQUMsSUFQNEI7QUFRckNDLGVBQU8sRUFBQyxLQVI2QjtBQVNyQ0MsaUJBQVMsRUFBQyxJQVQyQjtBQVVyQ0Msd0JBQWdCLEVBQUMsSUFWb0I7QUFXckNDLG1CQUFXLEVBQUM7QUFBQ1gsZ0JBQU0sRUFBQyxLQUFSO0FBQWVZLHlCQUFlLEVBQUMsSUFBL0I7QUFBcUNDLDZCQUFtQixFQUFDO0FBQXpEO0FBWHlCLE9BQTFCLENBQVo7O0FBY0EsVUFBSTNILE9BQU8sR0FBR3VDLE1BQU0sQ0FBQzFDLE1BQVAsQ0FBY3lGLEtBQWQsQ0FBZDtBQUVBL0csWUFBTSxDQUFDK0YsSUFBUCxDQUFZLGNBQVosRUFBNEIsUUFBNUIsRUFBc0N0RSxPQUF0QyxFQTVDc0MsQ0E4Q3RDOztBQUNBLFVBQUl5RyxlQUFlLENBQUNFLElBQWhCLElBQXdCLE9BQXhCLElBQW1DRixlQUFlLENBQUNFLElBQWhCLElBQXdCLElBQS9ELEVBQ0NqSCxLQUFLLENBQUNHLE1BQU4sQ0FBYTtBQUFDRyxlQUFPLEVBQUNBLE9BQVQ7QUFBa0JvQixZQUFJLEVBQUMsTUFBdkI7QUFBK0JpRSxhQUFLLEVBQUMsQ0FBckM7QUFBd0NwQyxpQkFBUyxFQUFFa0MsSUFBSSxDQUFDQyxHQUFMLEVBQW5EO0FBQThEc0IsYUFBSyxFQUFFLGtEQUFyRTtBQUF5SGtCLFlBQUksRUFBQztBQUE5SCxPQUFiLEVBREQsS0FHQ2xJLEtBQUssQ0FBQ0csTUFBTixDQUFhO0FBQUNHLGVBQU8sRUFBQ0EsT0FBVDtBQUFrQm9CLFlBQUksRUFBQyxNQUF2QjtBQUErQmlFLGFBQUssRUFBQyxDQUFyQztBQUF3Q3BDLGlCQUFTLEVBQUVrQyxJQUFJLENBQUNDLEdBQUwsRUFBbkQ7QUFBOERzQixhQUFLLEVBQUUsd0NBQXJFO0FBQStHa0IsWUFBSSxFQUFDO0FBQXBILE9BQWI7QUFFRCxhQUFPO0FBQUU3RyxXQUFHLEVBQUVmO0FBQVAsT0FBUDtBQUNBO0FBakZhLEdBQWY7QUFtRkE7O0FBR0QsU0FBU2dILFFBQVQsQ0FBa0JhLE1BQWxCLEVBQ0E7QUFDQyxNQUFJQyxJQUFJLEdBQUcsRUFBWDtBQUNBLE1BQUlDLFFBQVEsR0FBRyw0REFBZjs7QUFFQSxPQUFLLElBQUlDLENBQUMsR0FBQyxDQUFYLEVBQWNBLENBQUMsR0FBR0gsTUFBbEIsRUFBMEJHLENBQUMsRUFBM0IsRUFDQ0YsSUFBSSxJQUFJQyxRQUFRLENBQUNFLE1BQVQsQ0FBZ0JDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0JMLFFBQVEsQ0FBQ0YsTUFBcEMsQ0FBaEIsQ0FBUjs7QUFFRCxTQUFPQyxJQUFQO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUNoTEQsSUFBSXZGLE1BQUo7QUFBV25ELE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLDBCQUFaLEVBQXVDO0FBQUMrQyxRQUFNLENBQUM5QyxDQUFELEVBQUc7QUFBQzhDLFVBQU0sR0FBQzlDLENBQVA7QUFBUzs7QUFBcEIsQ0FBdkMsRUFBNkQsQ0FBN0Q7O0FBR1g7QUFFQSxJQUFJOEMsTUFBTSxDQUFDdEMsSUFBUCxHQUFjNkQsS0FBZCxPQUEwQixDQUE5QixFQUFpQztBQUNoQyxNQUFJdkYsTUFBTSxDQUFDc0gsS0FBUCxDQUFhNUYsSUFBYixHQUFvQjZELEtBQXBCLE9BQWdDLENBQXBDLEVBQXVDO0FBRXRDO0FBQ0F1RSxTQUFLLENBQUNDLFVBQU4sQ0FBaUIsT0FBakIsRUFBMEI7QUFBQ0Msa0JBQVksRUFBRTtBQUFmLEtBQTFCO0FBRUEsUUFBSUMsYUFBYSxHQUFHakssTUFBTSxDQUFDMEQsUUFBUCxDQUFnQnVHLGFBQXBDO0FBRUEsUUFBSTNDLEtBQUssR0FBRyxDQUNYO0FBQUM0QyxjQUFRLEVBQUMsT0FBVjtBQUFrQkMsV0FBSyxFQUFDLENBQUMsT0FBRDtBQUF4QixLQURXLENBQVo7O0FBSUF6RCxLQUFDLENBQUMwRCxJQUFGLENBQU85QyxLQUFQLEVBQWMsVUFBVStDLElBQVYsRUFBZ0I7QUFDN0IsVUFBSUMsRUFBSjtBQUNBQSxRQUFFLEdBQUc1QixRQUFRLENBQUM2QixVQUFULENBQW9CO0FBQ3hCTCxnQkFBUSxFQUFFRyxJQUFJLENBQUNILFFBRFM7QUFFeEJNLGFBQUssRUFBRSxpQkFGaUI7QUFHeEI7QUFDQUMsZ0JBQVEsRUFBRSxPQUpjO0FBS3hCQyxlQUFPLEVBQUM7QUFBQzdJLGNBQUksRUFBQztBQUFOO0FBTGdCLE9BQXBCLENBQUw7O0FBUUEsVUFBSXdJLElBQUksQ0FBQ0YsS0FBTCxDQUFXYixNQUFYLEdBQW9CLENBQXhCLEVBQTJCO0FBQzFCUSxhQUFLLENBQUNhLGVBQU4sQ0FBc0JMLEVBQXRCLEVBQTBCRCxJQUFJLENBQUNGLEtBQS9CO0FBQ0E7QUFDRCxLQWJEO0FBY0E7O0FBRURuRyxRQUFNLENBQUMxQyxNQUFQLENBQWM7QUFBQ2tCLE9BQUcsRUFBQyxtQkFBTDtBQUF5QjJGLFNBQUssRUFBQyxXQUEvQjtBQUEyQ3RDLFVBQU0sRUFBQztBQUFsRCxHQUFkO0FBQ0E2QyxVQUFRLENBQUM2QixVQUFULENBQW9CO0FBQ2pCTCxZQUFRLEVBQUUsTUFETztBQUVqQk0sU0FBSyxFQUFFLGNBRlU7QUFHakI7QUFDQUMsWUFBUSxFQUFFLE9BSk87QUFLakJDLFdBQU8sRUFBQztBQUFDN0ksVUFBSSxFQUFDO0FBQU47QUFMUyxHQUFwQjtBQU9BLEM7Ozs7Ozs7Ozs7O0FDekNEO0FBQ0F1RixZQUFZLEdBQUcsVUFBU3ZCLE1BQVQsRUFBaUJULEdBQWpCLEVBQXNCO0FBQ25DLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDUyxNQUFKLEtBQWVBLE1BQTdCO0FBQ0QsQ0FGRCxDLENBSUE7OztBQUNBd0IsT0FBTyxHQUFHLFVBQVN4QixNQUFULEVBQWlCO0FBQ3pCLFNBQU9pRSxLQUFLLENBQUNjLFlBQU4sQ0FBbUI1SyxNQUFNLENBQUNxSyxJQUFQLEVBQW5CLEVBQWtDLE9BQWxDLENBQVA7QUFDRCxDQUZELEM7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTTs7Ozs7Ozs7Ozs7QUN2UUEsSUFBSWxILEtBQUo7QUFBVXRDLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLHlCQUFaLEVBQXNDO0FBQUNrQyxPQUFLLENBQUNqQyxDQUFELEVBQUc7QUFBQ2lDLFNBQUssR0FBQ2pDLENBQU47QUFBUTs7QUFB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QUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQSxLQTdHZ0I7QUE4R2pCb0IsYUFBUyxFQUFFO0FBOUdNLEdBQWxCO0FBZ0hBLENBbEhELEU7Ozs7Ozs7Ozs7O0FDSkEsSUFBSTdNLE1BQUo7QUFBV2EsTUFBTSxDQUFDSSxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDakIsUUFBTSxDQUFDa0IsQ0FBRCxFQUFHO0FBQUNsQixVQUFNLEdBQUNrQixDQUFQO0FBQVM7O0FBQXBCLENBQTVCLEVBQWtELENBQWxEO0FBQXFETCxNQUFNLENBQUNJLElBQVAsQ0FBWSx1QkFBWjtBQUFxQ0osTUFBTSxDQUFDSSxJQUFQLENBQVksMkJBQVo7QUFBeUNKLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLHNCQUFaO0FBQW9DSixNQUFNLENBQUNJLElBQVAsQ0FBWSwwQkFBWjtBQUF3Q0osTUFBTSxDQUFDSSxJQUFQLENBQVksc0JBQVo7QUFTMU5qQixNQUFNLENBQUNRLE9BQVAsQ0FBZSxNQUFNO0FBRXBCUixRQUFNLENBQUN3QixPQUFQLENBQWUsSUFBZixFQUFxQixZQUFZO0FBQzdCLFdBQU94QixNQUFNLENBQUM4TSxjQUFQLENBQXNCcEwsSUFBdEIsRUFBUDtBQUVKLEdBSEEsRUFGb0IsQ0FNbkI7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDtBQUVBO0FBQ0E7QUFDQTtBQUVDLENBcEJELEUiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0SW5qZWN0LnJhd0hlYWQoXCJtZXRhTG9hZGVyXCIsICc8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwiaW5pdGlhbC1zY2FsZT0xLjAsIHVzZXItc2NhbGFibGU9MCwgd2lkdGg9ZGV2aWNlLXdpZHRoLCBoZWlnaHQ9ZGV2aWNlLWhlaWdodFwiLz48bWV0YSBuYW1lPVwiYXBwbGUtbW9iaWxlLXdlYi1hcHAtY2FwYWJsZVwiIGNvbnRlbnQ9XCJ5ZXNcIj5cdDxtZXRhIG5hbWU9XCJtb2JpbGUtd2ViLWFwcC1jYXBhYmxlXCIgY29udGVudD1cInllc1wiPicpO1xuXG5cdEluamVjdC5yYXdCb2R5KFwiaHRtbExvYWRlclwiLCBBc3NldHMuZ2V0VGV4dCgnYXBwX2xvYWRlci5odG1sJykpO1xufVxuXG5pZiAoTWV0ZW9yLmlzQ2xpZW50KSB7XG5cdE1ldGVvci5zdGFydHVwKGZ1bmN0aW9uKCkge1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHQkKFwiI2luamVjdC1sb2FkZXItd3JhcHBlclwiKS5mYWRlT3V0KDUwMCwgZnVuY3Rpb24oKSB7ICQodGhpcykucmVtb3ZlKCk7IH0pO1xuXHRcdH0sIDcwMCk7XG5cdH0pO1xufSIsImltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJztcblxuaW1wb3J0IHsgUG9zdHMgfSBmcm9tICcuL3Bvc3RzLmpzJztcbiBcbmV4cG9ydCBjb25zdCBBdXRob3JzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ3Jlc291cmNlcy1hdXRob3JzJyk7XG5cbkF1dGhvcnMuYWxsb3coe1xuXG5cdGluc2VydDogZnVuY3Rpb24oKSB7cmV0dXJuIHRydWV9LFxuXG5cdHJlbW92ZTogZnVuY3Rpb24oKSB7cmV0dXJuIHRydWV9LFxuXG5cdHVwZGF0ZTogZnVuY3Rpb24oKSB7cmV0dXJuIHRydWV9XG59KTtcblxuaWYoTWV0ZW9yLmlzU2VydmVyKSB7XG5cblx0TWV0ZW9yLnB1Ymxpc2goXCJhdXRob3JzXCIsIGZ1bmN0aW9uKHNwYWNlSWQpIHtcblx0XHRyZXR1cm4gQXV0aG9ycy5maW5kKHtzcGFjZUlkOiBzcGFjZUlkfSk7XG5cdH0pO1xufVxuXG5NZXRlb3IubWV0aG9kcyh7XG5cblx0YXV0aG9ySW5zZXJ0OiBmdW5jdGlvbihuYW1lLCBzcGFjZUlkKSB7XG5cdFx0QXV0aG9ycy5pbnNlcnQoe25hbWU6IG5hbWUsIHNwYWNlSWQ6IHNwYWNlSWQsIG5SZWZzOiAwfSxmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3Igd2hlbiBpbnNlcnRpbmcgYXV0aG9yICA6IFwiK2Vycm9yLm1lc3NhZ2UpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJBdXRob3IgaW5zZXJ0ZWRcIik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdGF1dGhvckVkaXQ6IGZ1bmN0aW9uKHNwYWNlSWQsIG9sZE5hbWUsIG5ld05hbWUpIHtcblx0XHR2YXIgYXV0aG9yID0gQXV0aG9ycy5maW5kT25lKHtuYW1lOiBvbGROYW1lLCBzcGFjZUlkOiBzcGFjZUlkfSk7XG5cdFx0QXV0aG9ycy51cGRhdGUoYXV0aG9yLl9pZCwgeyRzZXQ6IHtuYW1lOm5ld05hbWV9fSwgZnVuY3Rpb24oZXJyb3IpIHtcblx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkVycm9yIHdoZW4gY2hhbmdpbmcgYXV0aG9yIG5hbWUgOiBcIitlcnJvci5tZXNzYWdlKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRQb3N0cy51cGRhdGUoe3NwYWNlSWQ6c3BhY2VJZCwgYXV0aG9yOiBvbGROYW1lfSx7JHNldDoge2F1dGhvcjogbmV3TmFtZX19LCB7bXVsdGk6IHRydWV9KTsgLy8gVXBkYXRlIGFsbCBhdXRob3IgcG9zdHMgd2l0aCBuZXcgbmFtZVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59KTsiLCJpbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbyc7XG5cbmltcG9ydCB7IFBvc3RzIH0gZnJvbSAnLi9wb3N0cy5qcyc7XG4gXG5leHBvcnQgY29uc3QgQ2F0ZWdvcmllcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdyZXNvdXJjZXMtY2F0ZWdvcmllcycpO1xuXG5DYXRlZ29yaWVzLmFsbG93KHtcblxuXHRpbnNlcnQ6IGZ1bmN0aW9uKCkge3JldHVybiB0cnVlfSxcblxuXHRyZW1vdmU6IGZ1bmN0aW9uKCkge3JldHVybiB0cnVlfSxcblxuXHR1cGRhdGU6IGZ1bmN0aW9uKCkge3JldHVybiB0cnVlfVxufSk7XG5cblxuaWYoTWV0ZW9yLmlzU2VydmVyKSB7XG5cblx0TWV0ZW9yLnB1Ymxpc2goXCJjYXRlZ29yaWVzXCIsIGZ1bmN0aW9uKHNwYWNlSWQpIHtcblx0XHRyZXR1cm4gQ2F0ZWdvcmllcy5maW5kKHtzcGFjZUlkOiBzcGFjZUlkfSk7XG5cdH0pO1xufVxuXG5NZXRlb3IubWV0aG9kcyh7XG5cblx0Y2F0ZWdvcnlJbnNlcnQ6IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNwYWNlSWQpIHtcblx0XHRDYXRlZ29yaWVzLmluc2VydCh7dHlwZTogdHlwZSwgbmFtZTogbmFtZSwgc3BhY2VJZDogc3BhY2VJZCwgblJlZnM6IDB9KTtcblx0fSxcblx0Y2F0ZWdvcnlFZGl0OiBmdW5jdGlvbihzcGFjZUlkLCB0eXBlLCBvbGROYW1lLCBuZXdOYW1lKSB7XG5cdFx0dmFyIGNhdGVnb3J5ID0gQ2F0ZWdvcmllcy5maW5kT25lKHt0eXBlOiB0eXBlLCBuYW1lOiBvbGROYW1lLCBzcGFjZUlkOiBzcGFjZUlkfSk7XG5cdFx0Q2F0ZWdvcmllcy51cGRhdGUoY2F0ZWdvcnkuX2lkLCB7JHNldDoge25hbWU6bmV3TmFtZX19LCBmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3Igd2hlbiBjaGFuZ2luZyBjYXRlZ29yeSBuYW1lIDogXCIrZXJyb3IubWVzc2FnZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0UG9zdHMudXBkYXRlKHtzcGFjZUlkOnNwYWNlSWQsIHR5cGU6IHR5cGUsIGNhdGVnb3J5OiBvbGROYW1lfSx7JHNldDoge2NhdGVnb3J5OiBuZXdOYW1lfX0sIHttdWx0aTogdHJ1ZX0pOyAvLyBVcGRhdGUgYWxsIGF1dGhvciBwb3N0cyB3aXRoIG5ldyBuYW1lXG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdGNhdGVnb3J5RGVsZXRlOiBmdW5jdGlvbih0eXBlLCBuYW1lLCBzcGFjZUlkKSB7XG5cdFx0dmFyIGNhdGVnb3J5ID0gQ2F0ZWdvcmllcy5maW5kT25lKHt0eXBlOiB0eXBlLCBuYW1lOiBuYW1lLCBzcGFjZUlkOiBzcGFjZUlkfSk7XG5cdFx0Q2F0ZWdvcmllcy5yZW1vdmUoY2F0ZWdvcnkuX2lkLCBmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3Igd2hlbiBkZWxldGluZyBjYXRlZ29yeSA6IFwiK2Vycm9yLm1lc3NhZ2UpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFBvc3RzLnVwZGF0ZSh7dHlwZTogdHlwZSwgc3BhY2VJZDpzcGFjZUlkLCBjYXRlZ29yeTogbmFtZX0seyR1bnNldDoge2NhdGVnb3J5OlwiXCJ9fSwge211bHRpOiB0cnVlfSk7IC8vIFVwZGF0ZSBhbGwgYXV0aG9yIHBvc3RzIHdpdGggbmV3IG5hbWVcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSk7IiwiaW1wb3J0IHsgTW9uZ28gfSBmcm9tICdtZXRlb3IvbW9uZ28nO1xuIFxuZXhwb3J0IGNvbnN0IENvZGVzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ3Jlc291cmNlcy1jb2RlcycpO1xuXG5Db2Rlcy5hbGxvdyh7XG5cblx0aW5zZXJ0OiBmdW5jdGlvbigpIHtyZXR1cm4gdHJ1ZX0sXG5cblx0cmVtb3ZlOiBmdW5jdGlvbigpIHtyZXR1cm4gdHJ1ZX0sXG5cblx0dXBkYXRlOiBmdW5jdGlvbigpIHtyZXR1cm4gdHJ1ZX1cbn0pOyIsImltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJztcbiBcbmV4cG9ydCBjb25zdCBGaWxlcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdyZXNvdXJjZXMtZmlsZXMnKTtcblxuXG5GaWxlcy5hbGxvdyh7XG5cbiAgXHRpbnNlcnQ6IGZ1bmN0aW9uKCkge3JldHVybiB0cnVlfSxcblxuIFx0cmVtb3ZlOiBmdW5jdGlvbigpIHtyZXR1cm4gdHJ1ZX0sXG5cblx0dXBkYXRlOiBmdW5jdGlvbigpIHtyZXR1cm4gdHJ1ZX1cbn0pO1xuXG5pZihNZXRlb3IuaXNTZXJ2ZXIpIHtcblxuXHRNZXRlb3IucHVibGlzaChcImZpbGVcIiwgZnVuY3Rpb24oZmlsZUlkKSB7XG5cdHJldHVybiBGaWxlcy5maW5kKHtfaWQ6ZmlsZUlkfSlcbn0pO1xuXG5NZXRlb3IucHVibGlzaChcImZpbGVzXCIsIGZ1bmN0aW9uKHNwYWNlSWQpIHtcblx0cmV0dXJuIEZpbGVzLmZpbmQoe3NwYWNlSWQ6IHNwYWNlSWR9KVxufSk7XG5cbk1ldGVvci5wdWJsaXNoKFwiYWxsRmlsZXNcIiwgZnVuY3Rpb24oKSB7XG5cdHJldHVybiBGaWxlcy5maW5kKHt9KVxufSk7XG5cbk1ldGVvci5wdWJsaXNoKFwiZmlsZXNcIiwgZnVuY3Rpb24oc3BhY2VJZCkge1xuXHRjb25zb2xlLmxvZyhcInR1IHB1YmxpZXMuLi5cIik7XG5cdHJldHVybiBGaWxlcy5maW5kKHtzcGFjZUlkOiBzcGFjZUlkfSlcbn0pO1xuXG5cdHZhciBmcyA9IE5wbS5yZXF1aXJlKCdmcycpO1xuXHR2YXIgcmltcmFmID0gTnBtLnJlcXVpcmUoJ3JpbXJhZicpOyAvLyBQYWNrYWdlIHRvIGRlbGV0ZSBkaXJlY3Rvcmllc1xuXHR2YXIgdXBsb2FkRGlyID0gTWV0ZW9yLnNldHRpbmdzLnVwbG9hZERpcjtcblxuXHRNZXRlb3IubWV0aG9kcyh7XG5cblx0XHRkZWxldGVGaWxlOiBmdW5jdGlvbihwb3N0KSB7XG5cblx0XHRcdGlmIChwb3N0LnR5cGUgPT0gJ2xlc3NvbicpIC8vIFJlbW92ZSBkaXJlY3RvcnkgKGVhY2ggc3RvcmxpbmUgbGVzc29uIGlzIHN0b3JlZCBpbiBpcyBvd24gZGlyZWN0b3J5KVxuXHRcdFx0XHRyaW1yYWYodXBsb2FkRGlyK1wiL1wiK3Bvc3Quc3BhY2VJZCtcIi9cIitwb3N0LnR5cGUrXCIvXCIrcG9zdC5maWxlSWQsIGZ1bmN0aW9uIChlcnIpIHtjb25zb2xlLmxvZyhlcnIpfSk7XG5cdFx0XHRlbHNlIC8vIFJlbW92ZSB0aGUgZmlsZVxuICAgIFx0XHRcdGZzLnVubGlua1N5bmModXBsb2FkRGlyICtcIi9cIitwb3N0LmZpbGVQYXRoLCBmdW5jdGlvbiAoZXJyKSB7Y29uc29sZS5sb2coZXJyKX0pO1xuICBcdFx0fVxuXHR9KVxufSIsImltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJztcbiBcbmltcG9ydCB7IEF1dGhvcnMgfSBmcm9tICcuL2F1dGhvcnMuanMnO1xuaW1wb3J0IHsgU3BhY2VzIH0gZnJvbSAnLi9zcGFjZXMuanMnO1xuaW1wb3J0IHsgQ2F0ZWdvcmllcyB9IGZyb20gJy4vY2F0ZWdvcmllcy5qcyc7XG5pbXBvcnQgeyBGaWxlcyB9IGZyb20gJy4vZmlsZXMuanMnO1xuXG5cbmV4cG9ydCBjb25zdCBQb3N0cyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdyZXNvdXJjZXMtcG9zdHMnKTtcblxuXG5Qb3N0cy5hbGxvdyh7XG5cdGluc2VydDogZnVuY3Rpb24oKSB7cmV0dXJuIHRydWU7fSxcblxuXHRyZW1vdmU6IGZ1bmN0aW9uKCkge3JldHVybiB0cnVlO30sXG5cblx0dXBkYXRlOiBmdW5jdGlvbigpIHtyZXR1cm4gdHJ1ZTt9XG59KTtcblxuaWYoTWV0ZW9yLmlzQ2xpZW50KSB7XG5cdENvdW50cyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKFwiY291bnRzXCIpOyAvLyBTdG9yZSBwb3N0IGNvdW50IG9mIGEgc3BhY2UgOyBBbGxvdyB0byBjb3VudCB0aGVtIHdpdGhvdXQgc3Vic2NyaWJlIHRvIGFsbCBwb3N0cyAob3B0aW1pemF0aW9uKVxuXHRQaW5uZWRDb3VudHMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcInBpbm5lZENvdW50c1wiKTtcblx0RmlsZXNDb3VudHMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcImZpbGVzQ291bnRzXCIpO1xuXHRJbWFnZXNDb3VudHMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcImltYWdlc0NvdW50c1wiKTtcblx0TGl2ZUZlZWRDb3VudHMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcImxpdmVGZWVkQ291bnRzXCIpO1xufVxuXG5pZihNZXRlb3IuaXNTZXJ2ZXIpIHtcblxuTWV0ZW9yLnB1Ymxpc2goJ3Bvc3QnLCBmdW5jdGlvbihwb3N0SWQpIHtcblx0Y2hlY2socG9zdElkLCBTdHJpbmcpO1xuXHRyZXR1cm4gUG9zdHMuZmluZCh7X2lkOiBwb3N0SWR9KTtcbn0pO1xuXG5NZXRlb3IucHVibGlzaCgnaG9tZVBvc3RzJywgZnVuY3Rpb24oc3BhY2VJZCkge1xuXHRjaGVjayhzcGFjZUlkLCBTdHJpbmcpO1xuXHRyZXR1cm4gUG9zdHMuZmluZCh7c3BhY2VJZDogc3BhY2VJZCwgdHlwZTpcImhvbWVcIn0se3NvcnQ6IHtzdWJtaXR0ZWQ6IDF9fSk7XG59KTtcblxuTWV0ZW9yLnB1Ymxpc2goJ2xpdmVGZWVkUG9zdHMnLCBmdW5jdGlvbihzcGFjZUlkKSB7XG5cdGNoZWNrKHNwYWNlSWQsIFN0cmluZyk7XG5cdHJldHVybiBQb3N0cy5maW5kKHtzcGFjZUlkOiBzcGFjZUlkLCB0eXBlOlwibGl2ZUZlZWRcIn0se3NvcnQ6IHtzdWJtaXR0ZWQ6IC0xfX0pO1xufSk7XG5cbk1ldGVvci5wdWJsaXNoKCdyZXNvdXJjZXNQb3N0cycsIGZ1bmN0aW9uKHNwYWNlSWQpIHtcblx0Y2hlY2soc3BhY2VJZCwgU3RyaW5nKTtcblx0cmV0dXJuIFBvc3RzLmZpbmQoe3NwYWNlSWQ6IHNwYWNlSWQsIHR5cGU6XCJyZXNvdXJjZXNcIn0pO1xufSk7XG5cbk1ldGVvci5wdWJsaXNoKCdwb3N0cycsIGZ1bmN0aW9uKGZpbHRlcnMsIHNraXAgPSAwLCBsaW1pdCA9IDApIHtcblx0cmV0dXJuIFBvc3RzLmZpbmQoZmlsdGVycywge3NvcnQ6IHtzdWJtaXR0ZWQ6MX0sc2tpcDpza2lwLGxpbWl0OmxpbWl0fSk7XG59KTtcblxuXG5cblx0TWV0ZW9yLnB1Ymxpc2goXCJjb3VudC1hbGwtbGl2ZS1mZWVkXCIsIGZ1bmN0aW9uIChzcGFjZUlkKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0dmFyIGxpdmVGZWVkQ291bnRzID0gMDtcblx0dmFyIGluaXRpYWxpemluZyA9IHRydWU7XG5cblx0dmFyIGhhbmRsZSA9IFBvc3RzLmZpbmQoe3NwYWNlSWQ6IHNwYWNlSWQsIHR5cGU6J2xpdmVGZWVkJ30pLm9ic2VydmVDaGFuZ2VzKHtcblx0XHRhZGRlZDogZnVuY3Rpb24gKGRvYywgaWR4KSB7XG5cdFx0XHRsaXZlRmVlZENvdW50cysrO1xuXHRcdFx0aWYgKCFpbml0aWFsaXppbmcpIHtcblx0XHRcdFx0c2VsZi5jaGFuZ2VkKFwibGl2ZUZlZWRDb3VudHNcIiwgc3BhY2VJZCwge2NvdW50OiBsaXZlRmVlZENvdW50c30pOyAgLy8gXCJjb3VudHNcIiBpcyB0aGUgcHVibGlzaGVkIGNvbGxlY3Rpb24gbmFtZVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0cmVtb3ZlZDogZnVuY3Rpb24gKGRvYywgaWR4KSB7XG5cdFx0XHRsaXZlRmVlZENvdW50cy0tO1xuXHRcdFx0c2VsZi5jaGFuZ2VkKFwibGl2ZUZlZWRDb3VudHNcIiwgc3BhY2VJZCwge2NvdW50OiBsaXZlRmVlZENvdW50c30pOyAgLy8gU2FtZSBwdWJsaXNoZWQgY29sbGVjdGlvbiwgXCJjb3VudHNcIlxuXHRcdH1cblx0fSk7XG5cblx0aW5pdGlhbGl6aW5nID0gZmFsc2U7XG5cblx0Ly8gcHVibGlzaCB0aGUgaW5pdGlhbCBjb3VudC4gYG9ic2VydmVDaGFuZ2VzYCBndWFyYW50ZWVkIG5vdCB0byByZXR1cm5cblx0Ly8gdW50aWwgdGhlIGluaXRpYWwgc2V0IG9mIGBhZGRlZGAgY2FsbGJhY2tzIGhhdmUgcnVuLCBzbyB0aGUgYGNvdW50YFxuXHQvLyB2YXJpYWJsZSBpcyB1cCB0byBkYXRlLlxuXHRzZWxmLmFkZGVkKFwibGl2ZUZlZWRDb3VudHNcIiwgc3BhY2VJZCwge2NvdW50OiBsaXZlRmVlZENvdW50c30pO1xuXG5cdC8vIGFuZCBzaWduYWwgdGhhdCB0aGUgaW5pdGlhbCBkb2N1bWVudCBzZXQgaXMgbm93IGF2YWlsYWJsZSBvbiB0aGUgY2xpZW50XG5cdHNlbGYucmVhZHkoKTtcblxuXHQvLyB0dXJuIG9mZiBvYnNlcnZlIHdoZW4gY2xpZW50IHVuc3Vic2NyaWJlc1xuXHRzZWxmLm9uU3RvcChmdW5jdGlvbiAoKSB7XG5cdFx0aGFuZGxlLnN0b3AoKTtcblx0fSk7XG59KTtcbn1cblxuLy8gaWYoTWV0ZW9yLmlzU2VydmVyKSB7XG5cbi8vIFx0UG9zdHMuYmVmb3JlLmluc2VydChmdW5jdGlvbiAodXNlcklkLCBkb2MpIHtcbi8vIFx0XHQvLyBjaGFuZ2UgbW9kaWZpZWQgZGF0ZVxuLy8gXHRcdFNwYWNlcy51cGRhdGUoZG9jLnNwYWNlSWQsIHskc2V0OiB7bW9kaWZpZWQ6IERhdGUubm93KCl9fSk7XG4vLyBcdFx0ZG9jLnZlcnNpb24gPSAgMTtcbi8vIFx0XHQvL2RvYy5tb2RpZmllZCA9IERhdGUubm93KCk7XG4vLyBcdFx0Lypcbi8vIFx0XHR2YXIgdmVyc2lvbm5pbmcgPSB7fTtcbi8vIFx0XHRfLmV4dGVuZCh2ZXJzaW9ubmluZywgZG9jLCB7bW9kaWZpZWRCeTogdXNlcklkfSk7XG4vLyBcdFx0TWV0ZW9yLmNhbGwoJ2FkZFBvc3RWZXJzaW9uJywgdmVyc2lvbm5pbmcpO1xuLy8gXHRcdCovXG4vLyBcdH0pO1xuXG5cbi8vIFx0Ly8gQ29weSBwb3N0IGluIHBvc3RWZXJzaW9uIGJlZm9yZSB1cGRhdGVkXG4vLyBcdC8vIFRPRE8gOiByZWZhY3RvcmluZ1xuLy8gXHRQb3N0cy5iZWZvcmUudXBkYXRlKGZ1bmN0aW9uICh1c2VySWQsIGRvYywgZmllbGROYW1lcywgbW9kaWZpZXIsIG9wdGlvbnMpIHtcblxuXG5cbi8vIFx0XHQvLyB2YXIgdmVyc2lvbm5pbmcgPSB7fTtcbi8vIFx0XHQvLyBfLmV4dGVuZCh2ZXJzaW9ubmluZywgZG9jLCB7bW9kaWZpZWRCeTogdXNlcklkfSk7XG4vLyBcdFx0Ly8gTWV0ZW9yLmNhbGwoJ2FkZFBvc3RWZXJzaW9uJywgdmVyc2lvbm5pbmcpO1xuXG4vLyBcdFx0Ly8gdmFyIG5ld0luYyA9IGRvYy52ZXJzaW9uKzE7XG4vLyBcdFx0Ly8gaWYgKCFtb2RpZmllci4kc2V0KSBtb2RpZmllci4kc2V0ID0ge307XG4vLyBcdFx0Ly8gbW9kaWZpZXIuJHNldC52ZXJzaW9uID0gbmV3SW5jO1xuLy8gXHRcdC8vIG1vZGlmaWVyLiRzZXQubW9kaWZpZWQgPSBEYXRlLm5vdygpO1xuLy8gXHR9KTtcblxuXG4vLyBcdFBvc3RzLmJlZm9yZS5yZW1vdmUoZnVuY3Rpb24gKHVzZXJJZCwgZG9jKSB7IFxuXG5cbi8vIFx0XHQvLyB2YXIgZGVsZXRpb25UaW1lID0gRGF0ZS5ub3coKTtcblxuLy8gXHRcdC8vIE1ldGVvci5jYWxsKCd0YWdzRWRpdCcsIHtzcGFjZUlkOiBkb2Muc3BhY2VJZCwgbmV3VGFnczogW10sIG9sZFRhZ3M6IGRvYy50YWdzfSwgZnVuY3Rpb24oZXJyb3IpIHsgLy8gRGVjcmVtZW50IHRhZ3MgblJlZnNcbi8vIFx0XHQvLyBcdGlmIChlcnJvcikge1xuLy8gXHRcdC8vIFx0XHR0aHJvd0Vycm9yKGVycm9yLnJlYXNvbik7XG4vLyBcdFx0Ly8gXHR9XG4vLyAgXHQvLyBcdH0pO1xuXG4vLyBcdFx0Ly8gdmFyIGZpbGUgPSBGaWxlcy5maW5kT25lKHsnbWV0YWRhdGEucG9zdElkJzogZG9jLmZpbGVJZH0pOyAvLyBSZW1vdmUgZmlsZVxuLy8gXHRcdC8vIGlmIChmaWxlKXtcbi8vIFx0XHQvLyBcdCAvLyBUT0RPIDogcmVtb3ZlIGZpbGUgKG5vdCBvbmx5IGZyb20gY29sbGVjdGlvbilcbi8vIFx0XHQvLyBcdEZpbGVzLnJlbW92ZShmaWxlLl9pZCk7XG4vLyBcdFx0Ly8gfVxuXG4vLyBcdFx0Ly8gRGVsZXRlIHRoZSBmaWxlIGlmIGV4aXN0c1xuLy8gXHRcdHZhciBmaWxlSWQgPSBkb2MuZmlsZUlkO1xuLy8gXHRcdHZhciBmaWxlRXh0ID0gZG9jLmZpbGVFeHQ7XG4vLyBcdFx0aWYgKGZpbGVJZCkge1xuLy8gXHRcdFx0RmlsZXMucmVtb3ZlKHtmaWxlSWQ6ZmlsZUlkfSk7XG4vLyBcdFx0XHRNZXRlb3IuY2FsbCgnZGVsZXRlRmlsZScsZG9jKTtcbi8vIFx0XHR9XG5cbi8vIFx0XHRpZiAoZG9jLnR5cGUgPT0gJ2hvbWUnKSB7IC8vIFVwZGF0ZSBwb3N0IG9yZGVyXG4vLyBcdFx0XHR2YXIgcG9zdCA9IGRvYztcblxuLy8gXHRcdFx0dmFyIHBvc3RzRG93biA9IFBvc3RzLmZpbmQoe3NwYWNlSWQ6ZG9jLnNwYWNlSWQsIHR5cGU6J2hvbWUnLCBvcmRlcjp7JGd0OnBvc3Qub3JkZXJ9fSkuZmV0Y2goKTtcblxuLy8gXHRcdFx0Zm9yICh2YXIgaT0wOyBpPHBvc3RzRG93bi5sZW5ndGg7IGkrKykge1xuLy8gXHRcdFx0XHRjb25zb2xlLmxvZyhcImlkIDogXCIrcG9zdHNEb3duW2ldLl9pZCk7XG4vLyBcdFx0XHRcdHZhciBjdXJyZW50UG9zdCA9IHBvc3RzRG93bltpXTtcbi8vIFx0XHRcdFx0UG9zdHMudXBkYXRlKHtfaWQ6Y3VycmVudFBvc3QuX2lkfSx7JHNldDp7b3JkZXI6Y3VycmVudFBvc3Qub3JkZXItMX19KTtcbi8vIFx0XHRcdH1cbi8vIFx0XHR9XG5cbi8vIFx0XHRpZiAoZG9jLnR5cGUgPT0gJ2xpdmVGZWVkJykge1xuLy8gXHRcdFx0dmFyIGF1dGhvciA9IEF1dGhvcnMuZmluZE9uZSh7c3BhY2VJZDogZG9jLnNwYWNlSWQsIG5hbWU6IGRvYy5hdXRob3J9KTtcbi8vIFx0XHRcdEF1dGhvcnMudXBkYXRlKGF1dGhvci5faWQsIHskaW5jOiB7blJlZnM6IC0xfX0pOyAvLyBEZWNyZW1lbnQgYXV0aG9yIG5SZWZzXG5cbi8vIFx0XHRcdGlmIChkb2MuY2F0ZWdvcnkpIHtcbi8vIFx0XHRcdFx0dmFyIGNhdGVnb3J5ID0gQ2F0ZWdvcmllcy5maW5kT25lKHtzcGFjZUlkOiBkb2Muc3BhY2VJZCwgdHlwZTpcImxpdmVGZWVkXCIsIG5hbWU6IGRvYy5jYXRlZ29yeX0pO1xuLy8gXHRcdFx0XHRpZiAoY2F0ZWdvcnkpXG4vLyBcdFx0XHRcdFx0Q2F0ZWdvcmllcy51cGRhdGUoY2F0ZWdvcnkuX2lkLCB7JGluYzoge25SZWZzOiAtMX19KTsgLy8gRGVjcmVtZW50IGNhdGVnb3J5IG5SZWZzXG4vLyBcdFx0XHR9XG4vLyBcdFx0fVxuXG4vLyBcdFx0aWYgKGRvYy50eXBlID09ICdyZXNvdXJjZScpIHtcbi8vIFx0XHRcdGlmIChkb2MuY2F0ZWdvcnkpIHtcbi8vIFx0XHRcdFx0dmFyIGNhdGVnb3J5ID0gQ2F0ZWdvcmllcy5maW5kT25lKHtzcGFjZUlkOiBkb2Muc3BhY2VJZCwgdHlwZTpcInJlc291cmNlXCIsIG5hbWU6IGRvYy5jYXRlZ29yeX0pO1xuLy8gXHRcdFx0XHRpZiAoY2F0ZWdvcnkpXG4vLyBcdFx0XHRcdFx0Q2F0ZWdvcmllcy51cGRhdGUoY2F0ZWdvcnkuX2lkLCB7JGluYzoge25SZWZzOiAtMX19KTsgLy8gRGVjcmVtZW50IGNhdGVnb3J5IG5SZWZzXG4vLyBcdFx0XHR9XG4vLyBcdFx0fVxuLy8gXHRcdC8vIC8vIEFkZCBwb3N0IHRvIHBvc3RzIHZlcnNpb25zXG4vLyBcdFx0Ly8gLy8gVE9ETyA6IHJlZmFjdG9yaW5nXG4vLyBcdFx0Ly8gdmFyIHNwYWNlID0gU3BhY2VzLmZpbmRPbmUoZG9jLnNwYWNlSWQpO1xuLy8gXHRcdC8vIC8vIHZhciBvbGRQb3N0cyA9IFtdO1xuLy8gXHRcdC8vIC8vIGlmIChzcGFjZS5vbGRQb3N0cyAhPT0gdW5kZWZpbmVkKSB7XG4vLyBcdFx0Ly8gLy8gXHRvbGRQb3N0cyA9IHNwYWNlLm9sZFBvc3RzO1xuLy8gXHRcdC8vIC8vIH1cbi8vIFx0XHQvLyAvLyBvbGRQb3N0cy5wdXNoKGRvYy5faWQpO1xuLy8gXHRcdC8vIC8vU3BhY2VzLnVwZGF0ZShkb2Muc3BhY2VJZCwgeyRzZXQ6IHtvbGRQb3N0czogb2xkUG9zdHMsIG1vZGlmaWVkOiBEYXRlLm5vdygpfX0pO1xuLy8gXHRcdC8vIFNwYWNlcy51cGRhdGUoZG9jLnNwYWNlSWQsIHskc2V0OiB7bW9kaWZpZWQ6IERhdGUubm93KCl9fSk7XG5cbi8vIFx0XHQvLyBkb2MudmVyc2lvbiA9ICBkb2MudmVyc2lvbisrO1xuLy8gXHRcdC8vIGRvYy5tb2RpZmllZCA9IERhdGUubm93KCk7XG4vLyBcdFx0Ly8gdmFyIHZlcnNpb25uaW5nID0ge307XG4vLyBcdFx0Ly8gXy5leHRlbmQodmVyc2lvbm5pbmcsIGRvYywge21vZGlmaWVkQnk6IHVzZXJJZCwgbGFzdDogdHJ1ZX0pO1xuLy8gXHRcdC8vIE1ldGVvci5jYWxsKCdhZGRQb3N0VmVyc2lvbicsIHZlcnNpb25uaW5nKTtcbi8vIFx0fSk7XG4vLyB9XG5cbmlmKE1ldGVvci5pc1NlcnZlcikge1xuXG5cdFBvc3RzLmFmdGVyLnJlbW92ZShmdW5jdGlvbiAodXNlcklkLCBkb2MpIHsgXG5cdFx0XHRcblx0XHRcdC8vIERlbGV0ZSB0aGUgZmlsZSBpZiBleGlzdHNcblx0XHRcdHZhciBmaWxlSWQgPSBkb2MuZmlsZUlkO1xuXHRcdFx0dmFyIGZpbGVFeHQgPSBkb2MuZmlsZUV4dDtcblx0XHRcdGlmIChmaWxlSWQpIHtcblx0XHRcdFx0RmlsZXMucmVtb3ZlKHtmaWxlSWQ6ZmlsZUlkfSk7XG5cdFx0XHRcdE1ldGVvci5jYWxsKCdkZWxldGVGaWxlJyxkb2MpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBEZWNyZWFzZSBjYXRlZ29yeSBjb3VudFxuXHRcdFx0aWYgKGRvYy50eXBlID09ICdyZXNvdXJjZScpIHtcblx0XHRcdFx0aWYgKGRvYy5jYXRlZ29yeSkge1xuXHRcdFx0XHRcdHZhciBjYXRlZ29yeSA9IENhdGVnb3JpZXMuZmluZE9uZSh7c3BhY2VJZDogZG9jLnNwYWNlSWQsIHR5cGU6XCJyZXNvdXJjZVwiLCBuYW1lOiBkb2MuY2F0ZWdvcnl9KTtcblx0XHRcdFx0XHRpZiAoY2F0ZWdvcnkpXG5cdFx0XHRcdFx0XHRDYXRlZ29yaWVzLnVwZGF0ZShjYXRlZ29yeS5faWQsIHskaW5jOiB7blJlZnM6IC0xfX0pOyAvLyBEZWNyZW1lbnQgY2F0ZWdvcnkgblJlZnNcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHR9KTtcbn1cblxuXG5NZXRlb3IubWV0aG9kcyh7XG5cblx0YWRkTGlrZUNvbW1lbnQ6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRQb3N0cy51cGRhdGUoe19pZDpkYXRhLmN1cnJlbnRQb3N0SWQsXCJjb21tZW50cy5pZFwiOmRhdGEuY3VycmVudENvbW1lbnRJZH0sIHskcHVzaDoge1wiY29tbWVudHMuJC5saWtlc1wiOiBkYXRhLmF1dGhvcn19KTtcblx0fSxcblx0cmVtb3ZlTGlrZUNvbW1lbnQ6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRQb3N0cy51cGRhdGUoe19pZDpkYXRhLmN1cnJlbnRQb3N0SWQsXCJjb21tZW50cy5pZFwiOmRhdGEuY3VycmVudENvbW1lbnRJZH0sIHskcHVsbDoge1wiY29tbWVudHMuJC5saWtlc1wiOiBkYXRhLmF1dGhvcn19KTtcblx0fSxcblx0aG9tZVBvc3RJbnNlcnQ6IGZ1bmN0aW9uKHBvc3RBdHRyaWJ1dGVzKSB7XG5cdFx0Y2hlY2socG9zdEF0dHJpYnV0ZXMuc3BhY2VJZCwgU3RyaW5nKTtcblxuXHRcdC8vaWYgKE1ldGVvci5zZXR0aW5ncy5wdWJsaWMpXG5cdFx0XHQvL3ZhciBwb3N0RnJvbUNsb3VkID0gIShNZXRlb3Iuc2V0dGluZ3MucHVibGljLmlzQm94ID09PSBcInRydWVcIik7IC8vIFNldCB3aGVyZSBwb3N0IGlzIHN1Ym1pdHRlZCAoYm94IG9yIGNsb3VkKVxuXG5cdFx0cG9zdCA9IF8uZXh0ZW5kKHBvc3RBdHRyaWJ1dGVzLCB7XG5cdFx0XHRzdWJtaXR0ZWQ6IERhdGUubm93KCksXG5cdFx0XHRvcmRlcjogUG9zdHMuZmluZCh7c3BhY2VJZDogcG9zdEF0dHJpYnV0ZXMuc3BhY2VJZCwgdHlwZTogcG9zdEF0dHJpYnV0ZXMudHlwZX0pLmNvdW50KCksXG5cdFx0XHQvL25iOiBQb3N0cy5maW5kKHtzcGFjZUlkOiBwb3N0QXR0cmlidXRlcy5zcGFjZUlkfSkuY291bnQoKSArIDEsXG5cdFx0XHQvL3Bpbm5lZCA6IGZhbHNlLFxuXHRcdH0pO1xuXG5cdFx0dmFyIHNwYWNlID0gU3BhY2VzLmZpbmRPbmUocG9zdEF0dHJpYnV0ZXMuc3BhY2VJZCk7XG5cdFx0cG9zdC5faWQgPSBQb3N0cy5pbnNlcnQocG9zdCk7XHRcdFxuXHRcdHJldHVybiBwb3N0Ll9pZDtcblx0fSxcblx0cG9zdEluc2VydDogZnVuY3Rpb24ocG9zdEF0dHJpYnV0ZXMpIHtcblx0XHRjaGVjayhwb3N0QXR0cmlidXRlcy5zcGFjZUlkLCBTdHJpbmcpO1xuXG5cdFx0Ly9pZiAoTWV0ZW9yLnNldHRpbmdzLnB1YmxpYylcblx0XHRcdC8vdmFyIHBvc3RGcm9tQ2xvdWQgPSAhKE1ldGVvci5zZXR0aW5ncy5wdWJsaWMuaXNCb3ggPT09IFwidHJ1ZVwiKTsgLy8gU2V0IHdoZXJlIHBvc3QgaXMgc3VibWl0dGVkIChib3ggb3IgY2xvdWQpXG5cblx0XHQvLyBpdGVtID0gQXV0aG9ycy5maW5kT25lKHtzcGFjZUlkOiBwb3N0QXR0cmlidXRlcy5zcGFjZUlkLCBuYW1lOiBwb3N0QXR0cmlidXRlcy5hdXRob3J9KTtcblx0XHQvLyBBdXRob3JzLnVwZGF0ZShpdGVtLCB7JGluYzoge25SZWZzOiAxfX0pO1xuXHRcdC8vIHBvc3QgPSBfLmV4dGVuZChwb3N0QXR0cmlidXRlcywge1xuXHRcdC8vIFx0YXV0aG9ySWQ6IEF1dGhvcnMuZmluZE9uZSh7c3BhY2VJZDogcG9zdEF0dHJpYnV0ZXMuc3BhY2VJZCwgbmFtZTogcG9zdEF0dHJpYnV0ZXMuYXV0aG9yfSkuX2lkLFxuXHRcdC8vIFx0c3VibWl0dGVkOiBEYXRlLm5vdygpLFxuXHRcdC8vIFx0bmI6IFBvc3RzLmZpbmQoe3NwYWNlSWQ6IHBvc3RBdHRyaWJ1dGVzLnNwYWNlSWR9KS5jb3VudCgpICsgMSxcblx0XHQvLyBcdHBpbm5lZCA6IGZhbHNlLFxuXHRcdC8vIFx0Ly8gcG9zdEZyb21DbG91ZDogcG9zdEZyb21DbG91ZCAvLyBXb3JrYXJvdW5kIGJ1ZyBzeW5jXG5cdFx0Ly8gfSk7XG5cblx0XHQvLyBHZXQgY2xpZW50IElQIGFkZHJlc3Ncblx0XHRpZiAoTWV0ZW9yLmlzU2VydmVyKVxuXHRcdFx0cG9zdCA9IF8uZXh0ZW5kKHBvc3RBdHRyaWJ1dGVzLCB7Y2xpZW50SVA6IHRoaXMuY29ubmVjdGlvbi5jbGllbnRBZGRyZXNzfSk7XG5cblx0XHR2YXIgc3BhY2UgPSBTcGFjZXMuZmluZE9uZShwb3N0QXR0cmlidXRlcy5zcGFjZUlkKTtcblxuXHRcdGNhdGVnb3J5ID0gQ2F0ZWdvcmllcy5maW5kT25lKHtzcGFjZUlkOiBwb3N0QXR0cmlidXRlcy5zcGFjZUlkLCBuYW1lOiBwb3N0QXR0cmlidXRlcy5jYXRlZ29yeX0pOyAvLyBJbmNyZW1lbnQgY2F0ZWdvcnkgblJlZnNcblx0XHRDYXRlZ29yaWVzLnVwZGF0ZShjYXRlZ29yeSwgeyRpbmM6IHtuUmVmczogMX19KTtcblxuXHRcdHBvc3QuX2lkID0gUG9zdHMuaW5zZXJ0KHBvc3QpO1x0XHRcblx0XHRyZXR1cm4gcG9zdC5faWQ7XG5cdH1cbn0pOyIsImltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJztcblxuaW1wb3J0IHsgQXV0aG9ycyB9IGZyb20gJy4vYXV0aG9ycy5qcyc7XG5pbXBvcnQgeyBDb2RlcyB9IGZyb20gJy4vY29kZXMuanMnO1xuaW1wb3J0IHsgUG9zdHMgfSBmcm9tICcuL3Bvc3RzLmpzJztcblxuZXhwb3J0IGNvbnN0IFNwYWNlcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdyZXNvdXJjZXMtc3BhY2VzJyk7XG5cblxuU3BhY2VzLmFsbG93KHtcblxuXHQvL3VwZGF0ZTogZnVuY3Rpb24odXNlcklkLCBzcGFjZSkgeyByZXR1cm4gdHJ1ZX0sXG5cdC8vcmVtb3ZlOiBmdW5jdGlvbih1c2VySWQsIHNwYWNlKSB7IHJldHVybiB0cnVlfSxcblxuXHRpbnNlcnQ6IGZ1bmN0aW9uKHVzZXJJZCwgc3BhY2UpIHsgcmV0dXJuIG93bnNEb2N1bWVudCh1c2VySWQsIHNwYWNlKSB8fCBpc0FkbWluKHVzZXJJZCk7IH0sXG5cblx0dXBkYXRlOiBmdW5jdGlvbih1c2VySWQsIHNwYWNlKSB7IHJldHVybiBvd25zRG9jdW1lbnQodXNlcklkLCBzcGFjZSkgfHwgaXNBZG1pbih1c2VySWQpOyB9LFxuXG5cdHJlbW92ZTogZnVuY3Rpb24odXNlcklkLCBzcGFjZSkgeyByZXR1cm4gb3duc0RvY3VtZW50KHVzZXJJZCwgc3BhY2UpIHx8IGlzQWRtaW4odXNlcklkKTsgfVxufSk7XG5cblxuaWYoTWV0ZW9yLmlzU2VydmVyKSB7XHRcdGNvbnNvbGUubG9nKFwiaXMgU2VydmVyLi4uXCIpO1xuXG5cblxuLy8gdmFyIGNvbm5lY3Rpb24gPSBERFAuY29ubmVjdChcImh0dHA6Ly9iZWVrZWUuYm94OjgwXCIpO1xuLy8gQWNjb3VudHMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XG4vLyBNZXRlb3IudXNlcnMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcInVzZXJzXCIsIHtjb25uZWN0aW9uOiBjb25uZWN0aW9ufSk7XG5cblxuXG5cdE1ldGVvci5wdWJsaXNoKCdzcGFjZScsIGZ1bmN0aW9uKHNwYWNlSWQpIHtcblx0XHRjb25zb2xlLmxvZyhcInB1YmxpY2F0aW9uIHNwYWNlLi4uXCIpO1xuXHRcdGNoZWNrKHNwYWNlSWQsIFN0cmluZyk7XG5cdFx0cmV0dXJuIFNwYWNlcy5maW5kKHtfaWQ6IHNwYWNlSWR9KTtcdFxuXHR9KTtcblxuXHRNZXRlb3IucHVibGlzaCgnYWxsU3BhY2VzJywgZnVuY3Rpb24oKSB7XG5cdHJldHVybiBTcGFjZXMuZmluZCh7fSk7XG5cdH0pO1xuXG5cdE1ldGVvci5wdWJsaXNoKCdhbGxVc2VycycsIGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gTWV0ZW9yLnVzZXJzLmZpbmQoKTtcbiBcdH0pO1xuXG5cdE1ldGVvci5wdWJsaXNoKCdwdWJsaWNTcGFjZXMnLCBmdW5jdGlvbih1c2VySWQpIHtcblx0cmV0dXJuIFNwYWNlcy5maW5kKHtcInBlcm1pc3Npb25zLnB1YmxpY1wiOnRydWV9KTtcblx0fSk7XG5cblx0TWV0ZW9yLnB1Ymxpc2goJ293blNwYWNlcycsIGZ1bmN0aW9uKHVzZXJJZCkge1xuXHRcdGNvbnNvbGUubG9nKFwib3duIHNwYWNlLi4uIDogXCIrU3BhY2VzLmZpbmQoKSk7XG5cdFx0cmV0dXJuIFNwYWNlcy5maW5kKHt1c2VySWQ6dXNlcklkfSk7XG5cdH0pO1xuXG5cdE1ldGVvci5wdWJsaXNoKCdzcGFjZXNWaXNpdGVkJywgZnVuY3Rpb24oc3BhY2VzSWQpIHtcblx0XHRyZXR1cm4gU3BhY2VzLmZpbmQoeyBcIl9pZFwiOiB7IFwiJGluXCI6IHNwYWNlc0lkIH0gfSk7XG5cdH0pO1xuXHQvLyBTcGFjZXMuYmVmb3JlLnVwZGF0ZShmdW5jdGlvbiAodXNlcklkLCBkb2MsIGZpZWxkTmFtZXMsIG1vZGlmaWVyLCBvcHRpb25zKSB7XG5cblx0Ly8gXHRtb2RpZmllci4kc2V0ID0gbW9kaWZpZXIuJHNldCB8fCB7fTtcblx0Ly8gXHRtb2RpZmllci4kc2V0Lm1vZGlmaWVkID0gRGF0ZS5ub3coKTtcblxuXHQvLyBcdC8vIGNoYW5nZSBtb2RpZmllZCBkYXRlXG5cdC8vIFx0ZG9jLnZlcnNpb24gPSAgZG9jLnZlcnNpb24rKztcblx0Ly8gXHRkb2MubW9kaWZpZWQgPSBEYXRlLm5vdygpO1xuXHQvLyB9KTtcblxuXHQvLyBTcGFjZXMuYmVmb3JlLmluc2VydChmdW5jdGlvbiAodXNlcklkLCBkb2MpIHtcblx0Ly8gXHQvLyBjaGFuZ2UgbW9kaWZpZWQgZGF0ZVxuXHQvLyBcdGRvYy5zdWJtaXR0ZWQgPSAgRGF0ZS5ub3coKTtcblx0Ly8gfSk7XG5cblxuXHQvLyBTcGFjZXMuYmVmb3JlLnJlbW92ZShmdW5jdGlvbiAodXNlcklkLCBkb2MpIHtcblxuXHQvLyBcdHZhciBzcGFjZUlkID0gZG9jLl9pZDtcblx0Ly8gXHRQb3N0cy5yZW1vdmUoe3NwYWNlSWQ6c3BhY2VJZH0pO1xuXHQvLyB9KTtcblxuXG5cdE1ldGVvci5tZXRob2RzKHtcblxuXHRcdGdldFNwYWNlSWQ6IGZ1bmN0aW9uKHNwYWNlQ29kZSkge1xuXHRcdFx0aWYgKFNwYWNlcy5maW5kT25lKHtzcGFjZUNvZGU6c3BhY2VDb2RlfSkpXG5cdFx0XHRcdHJldHVybiBTcGFjZXMuZmluZE9uZSh7c3BhY2VDb2RlOnNwYWNlQ29kZX0pLl9pZDtcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSxcblx0XHR1cGRhdGVDb2RlOiBmdW5jdGlvbihvbGRDb2RlLCBuZXdDb2RlKSB7XG5cdFx0XHR2YXIgY29kZUlkID0gQ29kZXMuZmluZE9uZSh7Y29kZTogb2xkQ29kZX0pLl9pZDtcblx0XHRcdENvZGVzLnVwZGF0ZShjb2RlSWQse2NvZGU6bmV3Q29kZX0sIGZ1bmN0aW9uKGVycm9yKSB7XG5cdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3Igd2hlbiBjaGFuZ2luZyBjb2RlIDogXCIrZXJyb3IubWVzc2FnZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJDb2RlIGhhcyBiZWVuIGNoYW5nZWQuXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH0sXG5cdFx0ZGVsZXRlU3BhY2U6IGZ1bmN0aW9uKHNwYWNlSWQpIHtcblx0XHRcdFNwYWNlcy5yZW1vdmUoc3BhY2VJZCk7XG5cdFx0XHQvL1Bvc3RzLnJlbW92ZSh7c3BhY2VJZDpzcGFjZUlkfSx7bXVsdGk6dHJ1ZX0pO1xuXHRcdH0sXG5cdFx0ZGVsZXRlU3BhY2VzOiBmdW5jdGlvbih1c2VySWQpIHtcblxuXHRcdFx0U3BhY2VzLnJlbW92ZSh7dXNlcklkOnVzZXJJZH0pO1xuXG5cdFx0fSxcblx0XHRzcGFjZUluc2VydDogZnVuY3Rpb24oc3BhY2VBdHRyaWJ1dGVzKSB7XG5cblx0XHRcdGNoZWNrKHNwYWNlQXR0cmlidXRlcywge1xuXHRcdFx0XHRcdHRpdGxlOiBTdHJpbmcsXG5cdFx0XHRcdFx0bGFuZzogU3RyaW5nXG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIG5iT2ZDb2RlcyA9IENvZGVzLmZpbmQoKS5jb3VudCgpO1xuXHRcdFx0dmFyIHByZWZpeCA9IE1ldGVvci5zZXR0aW5ncy5wdWJsaWMucHJlZml4O1xuXHRcdFx0dmFyIGNvZGVMZW5ndGggPSA0O1xuXG5cdFx0XHRpZiAobmJPZkNvZGVzIDw9IDEwMDApXG5cdFx0XHRcdGNvZGVMZW5ndGggPSAyO1xuXHRcdFx0ZWxzZSBpZiAobmJPZkNvZGVzID4gMTAwMCAmJiBuYk9mQ29kZXMgPD0gMTAwMDAwKVxuXHRcdFx0XHRjb2RlTGVuZ3RoID0gMztcblx0XHRcdGVsc2UgaWYgKG5iT2ZDb2RlcyA+IDEwMDAwMCAmJiBuYk9mQ29kZXMgPD0gMTAwMDAwMDApXG5cdFx0XHRcdGNvZGVMZW5ndGggPSA0O1xuXG5cdFx0XHR2YXIgY29kZSA9IHByZWZpeCArIG1ha2VDb2RlKGNvZGVMZW5ndGgpO1xuXHRcdFx0d2hpbGUgKHR5cGVvZiBDb2Rlcy5maW5kT25lKHtjb2RlOiBjb2RlfSkgIT0gJ3VuZGVmaW5lZCcpXG5cdFx0XHRcdGNvZGUgPSBwcmVmaXggKyBtYWtlQ29kZShjb2RlTGVuZ3RoKTtcblxuXHRcdFx0Q29kZXMuaW5zZXJ0KHtjb2RlOmNvZGUsIHVzZXJJZDpNZXRlb3IudXNlcklkKCl9KTtcblxuXHRcdFx0dmFyIHVzZXJJZCA9IE1ldGVvci51c2VySWQoKTtcblx0XHRcdGNvbnNvbGUubG9nKFwidXNlciBJZCA6IFwiK0FjY291bnRzLnVzZXJJZCgpKTtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwidXNlciBJZCA6IFwiK01ldGVvci51c2VySWQoKSk7XG5cblx0XHRcdHZhciBzcGFjZSA9IF8uZXh0ZW5kKHNwYWNlQXR0cmlidXRlcywge1xuXHRcdFx0XHR1c2VySWQ6IHVzZXJJZCxcblx0XHRcdFx0c3BhY2VDb2RlOiBjb2RlLFxuXHRcdFx0XHRzdWJtaXR0ZWQ6IG5ldyBEYXRlKCksXG5cdFx0XHRcdHZpc2libGU6IHRydWUsXG5cdFx0XHRcdGNvZGVQYW5lbDogdHJ1ZSxcblx0XHRcdFx0Y3JlYXRlVXNlckFsbG93ZWQ6dHJ1ZSxcblx0XHRcdFx0bGl2ZUZlZWQ6dHJ1ZSxcblx0XHRcdFx0bGVzc29uczpmYWxzZSxcblx0XHRcdFx0cmVzb3VyY2VzOnRydWUsXG5cdFx0XHRcdGxpdmVGZWVkQ29tbWVudHM6dHJ1ZSxcblx0XHRcdFx0cGVybWlzc2lvbnM6e3B1YmxpYzpmYWxzZSwgbGl2ZUZlZWRBZGRQb3N0OnRydWUsIGxpdmVGZWVkQWRkQ2F0ZWdvcnk6ZmFsc2V9XG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIHNwYWNlSWQgPSBTcGFjZXMuaW5zZXJ0KHNwYWNlKTtcblxuXHRcdFx0TWV0ZW9yLmNhbGwoJ2F1dGhvckluc2VydCcsICdJbnZpdMOpJywgc3BhY2VJZCApO1xuXG5cdFx0XHQvLyBJbnNlcnQgd2VsY29tZSBwb3N0XG5cdFx0XHRpZiAoc3BhY2VBdHRyaWJ1dGVzLmxhbmcgPT0gXCJmci1GUlwiIHx8IHNwYWNlQXR0cmlidXRlcy5sYW5nID09IFwiZnJcIilcblx0XHRcdFx0UG9zdHMuaW5zZXJ0KHtzcGFjZUlkOnNwYWNlSWQsIHR5cGU6XCJob21lXCIsIG9yZGVyOjAsIHN1Ym1pdHRlZDogRGF0ZS5ub3coKSx0aXRsZTogXCJCaWVudmVudWUgZGFucyB2b3RyZSBub3V2ZWwgZXNwYWNlIEJlZWtlZSBMaXZlICFcIiwgYm9keTpcIjxwPkJlZWtlZSBMaXZlIGVzdCBsJ291dGlsIGlkw6lhbCBwb3VyIHNvdXRlbmlyIGxlcyBpbnRlcmFjdGlvbnMgZW4gdGVtcHMgcsOpZWwsIHBvdXIgcGFydGFnZXIgZGVzIHBob3RvcyBvdSBkZXMgZmljaGllcnMgYXZlYyB2b3Mgw6l0dWRpYW50cy48L3A+XFxuPHA+Q2UgbWVzc2FnZSBlc3QgdmlzaWJsZSBwYXIgdm9zIMOpdHVkaWFudHMgOiBzZW50ZXotdm91cyBsaWJyZSBkZSBsZSBtb2RpZmllciAob3UgZGUgbGUgc3VwcHJpbWVyKSBwb3VyIGNvbW11bmlxdWVyIGF2ZWMgZXV4LjwvcD5cIn0pO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRQb3N0cy5pbnNlcnQoe3NwYWNlSWQ6c3BhY2VJZCwgdHlwZTpcImhvbWVcIiwgb3JkZXI6MCwgc3VibWl0dGVkOiBEYXRlLm5vdygpLHRpdGxlOiBcIldlbGNvbWUgdG8geW91ciBuZXcgQmVla2VlIExpdmUgc3BhY2UhXCIsIGJvZHk6XCI8cD5CZWVrZWUgTGl2ZSBpcyBpZGVhbCBmb3IgcmVhbC10aW1lIGludGVyYWN0aW9ucyBhbmQgdG8gc2hhcmUgcGljdHVyZXMgb3IgZmlsZXMgd2l0aCB5b3VyIGxlYXJuZXJzLjwvcD5cXG48cD5UaGlzIG1lc3NhZ2Ugd2lsbCBiZSB2aXNpYmlsZSBmb3IgZXZlcnlvbmU6IGZlZWwgZnJlZSB0byBlZGl0IChvciBkZWxldGUgKSBpdCBhY2NvcmRpbmcgdG8geW91ciBuZWVkcy48L3A+XCJ9KTtcblxuXHRcdFx0cmV0dXJuIHsgX2lkOiBzcGFjZUlkIH07XG5cdFx0fVxuXHR9KTtcbn1cblxuXG5mdW5jdGlvbiBtYWtlQ29kZShsZW5ndGgpXG57XG5cdHZhciB0ZXh0ID0gXCJcIjtcblx0dmFyIHBvc3NpYmxlID0gXCJBQkNERUZHSEpLTE1OUFFSU1RVVldYWVphYmNkZWZnaGlqa21ub3BxcnN0dXZ3eHl6MTIzNDU2Nzg5XCI7XG5cblx0Zm9yKCB2YXIgaT0wOyBpIDwgbGVuZ3RoOyBpKysgKVxuXHRcdHRleHQgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xuXHRcblx0cmV0dXJuIHRleHQ7XG59IiwiaW1wb3J0IHsgU3BhY2VzIH0gZnJvbSAnLi4vaW1wb3J0cy9hcGkvc3BhY2VzLmpzJztcblxuXG4vLyAjIyMgIENyZWF0ZSBhZG1pbiB1c2VyIGF0IGZpcnN0IHN0YXJ0ICAjIyNcblxuaWYgKFNwYWNlcy5maW5kKCkuY291bnQoKSA9PT0gMCkge1xuXHRpZiAoTWV0ZW9yLnVzZXJzLmZpbmQoKS5jb3VudCgpID09PSAwKSB7XG5cblx0XHQvLyBDcmVhdGUgdGhlIGFkbWluIHJvbGVcblx0XHRSb2xlcy5jcmVhdGVSb2xlKCdhZG1pbicsIHt1bmxlc3NFeGlzdHM6IHRydWV9KTtcblxuXHRcdHZhciBhZG1pblBhc3N3b3JkID0gTWV0ZW9yLnNldHRpbmdzLmFkbWluUGFzc3dvcmQ7XG5cblx0XHR2YXIgdXNlcnMgPSBbXG5cdFx0XHR7dXNlcm5hbWU6XCJhZG1pblwiLHJvbGVzOlsnYWRtaW4nXX0sXG5cdFx0XTtcblxuXHRcdF8uZWFjaCh1c2VycywgZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdHZhciBpZDtcblx0XHRcdGlkID0gQWNjb3VudHMuY3JlYXRlVXNlcih7XG5cdFx0XHRcdHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxuXHRcdFx0XHRlbWFpbDogXCJhZG1pbkBiZWVrZWUuY2hcIixcblx0XHRcdFx0Ly9wYXNzd29yZDogYWRtaW5QYXNzd29yZCxcblx0XHRcdFx0cGFzc3dvcmQ6IFwiYWRtaW5cIixcblx0XHRcdFx0cHJvZmlsZTp7bmFtZTpcIkFkbWluXCJ9XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHVzZXIucm9sZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRSb2xlcy5hZGRVc2Vyc1RvUm9sZXMoaWQsIHVzZXIucm9sZXMpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0U3BhY2VzLmluc2VydCh7X2lkOlwiZWZCYzNwakMySmlkbmtMQTJcIix0aXRsZTpcIlJlc291cmNlc1wiLHVzZXJJZDpcIkFkbWluXCJ9KTtcblx0QWNjb3VudHMuY3JlYXRlVXNlcih7XG5cdFx0XHRcdHVzZXJuYW1lOiBcIm1hcmNcIixcblx0XHRcdFx0ZW1haWw6IFwibWFyY0BtYXJjLmNoXCIsXG5cdFx0XHRcdC8vcGFzc3dvcmQ6IGFkbWluUGFzc3dvcmQsXG5cdFx0XHRcdHBhc3N3b3JkOiBcIjEyMzQ1XCIsXG5cdFx0XHRcdHByb2ZpbGU6e25hbWU6XCJNYXJjXCJ9XG5cdFx0XHR9KTtcbn0iLCIvLyBjaGVjayB0aGF0IHRoZSB1c2VySWQgc3BlY2lmaWVkIG93bnMgdGhlIGRvY3VtZW50c1xub3duc0RvY3VtZW50ID0gZnVuY3Rpb24odXNlcklkLCBkb2MpIHtcbiAgcmV0dXJuIGRvYyAmJiBkb2MudXNlcklkID09PSB1c2VySWQ7XG59XG5cbi8vIGNoZWNrIHRoYXQgdGhlIHVzZXJJZCBzcGVjaWZpZWQgaXMgYWRtaW5cbmlzQWRtaW4gPSBmdW5jdGlvbih1c2VySWQpIHtcbiAgcmV0dXJuIFJvbGVzLnVzZXJJc0luUm9sZShNZXRlb3IudXNlcigpLCAnYWRtaW4nKTtcbn0iLCIvLyBNZXRlb3IucHVibGlzaCgnc3BhY2UnLCBmdW5jdGlvbihzcGFjZUlkKSB7XG4vLyBcdGNoZWNrKHNwYWNlSWQsIFN0cmluZyk7XG4vLyBcdHJldHVybiBTcGFjZXMuZmluZCh7X2lkOiBzcGFjZUlkfSk7XHRcbi8vIH0pO1xuXG4vLyBNZXRlb3IucHVibGlzaCgnYWxsU3BhY2VzJywgZnVuY3Rpb24oKSB7XG4vLyBcdHJldHVybiBTcGFjZXMuZmluZCh7fSk7XG4vLyB9KTtcblxuLy8gTWV0ZW9yLnB1Ymxpc2goJ3B1YmxpY1NwYWNlcycsIGZ1bmN0aW9uKHVzZXJJZCkge1xuLy8gXHRyZXR1cm4gU3BhY2VzLmZpbmQoe1wicGVybWlzc2lvbnMucHVibGljXCI6dHJ1ZX0pO1xuLy8gfSk7XG5cbi8vIE1ldGVvci5wdWJsaXNoKCdvd25TcGFjZXMnLCBmdW5jdGlvbih1c2VySWQpIHtcbi8vIFx0cmV0dXJuIFNwYWNlcy5maW5kKHt1c2VySWQ6dXNlcklkfSk7XG4vLyB9KTtcblxuLy8gTWV0ZW9yLnB1Ymxpc2goJ3NwYWNlc1Zpc2l0ZWQnLCBmdW5jdGlvbihzcGFjZXNJZCkge1xuLy8gXHRyZXR1cm4gU3BhY2VzLmZpbmQoeyBcIl9pZFwiOiB7IFwiJGluXCI6IHNwYWNlc0lkIH0gfSk7XG4vLyB9KTtcblxuLy8gTWV0ZW9yLnB1Ymxpc2goJ3Bvc3QnLCBmdW5jdGlvbihwb3N0SWQpIHtcbi8vIFx0Y2hlY2socG9zdElkLCBTdHJpbmcpO1xuLy8gXHRyZXR1cm4gUG9zdHMuZmluZCh7X2lkOiBwb3N0SWR9KTtcbi8vIH0pO1xuXG5cblxuXG4vLyBNZXRlb3IucHVibGlzaCgnaG9tZVBvc3RzJywgZnVuY3Rpb24oc3BhY2VJZCkge1xuLy8gXHRjaGVjayhzcGFjZUlkLCBTdHJpbmcpO1xuLy8gXHRyZXR1cm4gUG9zdHMuZmluZCh7c3BhY2VJZDogc3BhY2VJZCwgdHlwZTpcImhvbWVcIn0se3NvcnQ6IHtzdWJtaXR0ZWQ6IDF9fSk7XG4vLyB9KTtcblxuLy8gTWV0ZW9yLnB1Ymxpc2goJ2xpdmVGZWVkUG9zdHMnLCBmdW5jdGlvbihzcGFjZUlkKSB7XG4vLyBcdGNoZWNrKHNwYWNlSWQsIFN0cmluZyk7XG4vLyBcdHJldHVybiBQb3N0cy5maW5kKHtzcGFjZUlkOiBzcGFjZUlkLCB0eXBlOlwibGl2ZUZlZWRcIn0se3NvcnQ6IHtzdWJtaXR0ZWQ6IC0xfX0pO1xuLy8gfSk7XG5cbi8vIE1ldGVvci5wdWJsaXNoKCdsZXNzb25zUG9zdHMnLCBmdW5jdGlvbihzcGFjZUlkKSB7XG4vLyBcdGNoZWNrKHNwYWNlSWQsIFN0cmluZyk7XG4vLyBcdHJldHVybiBQb3N0cy5maW5kKHtzcGFjZUlkOiBzcGFjZUlkLCB0eXBlOlwibGVzc29uc1wifSk7XG4vLyB9KTtcblxuLy8gTWV0ZW9yLnB1Ymxpc2goJ3Jlc291cmNlc1Bvc3RzJywgZnVuY3Rpb24oc3BhY2VJZCkge1xuLy8gXHRjaGVjayhzcGFjZUlkLCBTdHJpbmcpO1xuLy8gXHRyZXR1cm4gUG9zdHMuZmluZCh7c3BhY2VJZDogc3BhY2VJZCwgdHlwZTpcInJlc291cmNlc1wifSk7XG4vLyB9KTtcblxuXG4vLyBNZXRlb3IucHVibGlzaCgncG9zdHMnLCBmdW5jdGlvbihmaWx0ZXJzLCBza2lwID0gMCwgbGltaXQgPSAwKSB7XG4vLyBcdHJldHVybiBQb3N0cy5maW5kKGZpbHRlcnMsIHtzb3J0OiB7c3VibWl0dGVkOjF9LHNraXA6c2tpcCxsaW1pdDpsaW1pdH0pO1xuLy8gfSk7XG5cblxuLy8gLy8gTWV0ZW9yLnB1Ymxpc2goJ3Bvc3RzJywgZnVuY3Rpb24oZmlsdGVycyxza2lwLGxpbWl0KSB7XG4vLyAvLyBcdHJldHVybiBQb3N0cy5maW5kKGZpbHRlcnMsIHtzb3J0OiB7c3VibWl0dGVkOiAxfSxza2lwOnNraXAsbGltaXQ6bGltaXR9KTtcbi8vIC8vIH0pO1xuXG4vLyBNZXRlb3IucHVibGlzaChcImZpbGVcIiwgZnVuY3Rpb24oZmlsZUlkKSB7XG4vLyBcdHJldHVybiBGaWxlcy5maW5kKHtfaWQ6ZmlsZUlkfSlcbi8vIH0pO1xuXG4vLyBNZXRlb3IucHVibGlzaChcImZpbGVzXCIsIGZ1bmN0aW9uKHNwYWNlSWQpIHtcbi8vIFx0cmV0dXJuIEZpbGVzLmZpbmQoe3NwYWNlSWQ6IHNwYWNlSWR9KVxuLy8gfSk7XG5cbi8vIE1ldGVvci5wdWJsaXNoKFwiYWxsRmlsZXNcIiwgZnVuY3Rpb24oKSB7XG4vLyBcdHJldHVybiBGaWxlcy5maW5kKHt9KVxuLy8gfSk7XG5cbi8vIE1ldGVvci5wdWJsaXNoKFwiYXV0aG9yc1wiLCBmdW5jdGlvbihzcGFjZUlkKSB7XG4vLyBcdHJldHVybiBBdXRob3JzLmZpbmQoe3NwYWNlSWQ6IHNwYWNlSWR9KTtcbi8vIH0pO1xuXG4vLyBNZXRlb3IucHVibGlzaChcImNhdGVnb3JpZXNcIiwgZnVuY3Rpb24oc3BhY2VJZCkge1xuLy8gXHRyZXR1cm4gQ2F0ZWdvcmllcy5maW5kKHtzcGFjZUlkOiBzcGFjZUlkfSk7XG4vLyB9KTtcblxuLy8gTWV0ZW9yLnB1Ymxpc2goXCJ0YWdzXCIsIGZ1bmN0aW9uKHNwYWNlSWQpIHtcbi8vIFx0cmV0dXJuIFRhZ3MuZmluZCh7c3BhY2VJZDogc3BhY2VJZH0pO1xuLy8gfSk7XG5cbi8vIE1ldGVvci5wdWJsaXNoKCdhbGxVc2VycycsIGZ1bmN0aW9uKCkge1xuLy8gXHRyZXR1cm4gTWV0ZW9yLnVzZXJzLmZpbmQoKTtcbi8vICB9KVxuXG4vLyBQdWJsaXNoIHRoZSBjdXJyZW50IHNpemUgb2YgYSBjb2xsZWN0aW9uIHdpdGhvdXQgc3Vic2NyaWJlIHRvIHRoZSBjb2xsZWN0aW9uXG4vLyBNZXRlb3IucHVibGlzaChcImNvdW50LWFsbC1saXZlLWZlZWQtcG9zdHNcIiwgZnVuY3Rpb24gKHNwYWNlSWQpIHtcbi8vIFx0dmFyIHNlbGYgPSB0aGlzO1xuLy8gXHR2YXIgY291bnQgPSAwO1xuLy8gXHR2YXIgaW5pdGlhbGl6aW5nID0gdHJ1ZTtcblxuLy8gXHR2YXIgaGFuZGxlID0gUG9zdHMuZmluZCh7c3BhY2VJZDogc3BhY2VJZCwgdHlwZTpcImxpdmVGZWVkXCJ9KS5vYnNlcnZlQ2hhbmdlcyh7XG4vLyBcdFx0YWRkZWQ6IGZ1bmN0aW9uIChkb2MsIGlkeCkge1xuLy8gXHRcdFx0Y291bnQrKztcbi8vIFx0XHRcdGlmICghaW5pdGlhbGl6aW5nKSB7XG4vLyBcdFx0XHRcdHNlbGYuY2hhbmdlZChcImNvdW50c1wiLCBzcGFjZUlkLCB7Y291bnQ6IGNvdW50fSk7ICAvLyBcImNvdW50c1wiIGlzIHRoZSBwdWJsaXNoZWQgY29sbGVjdGlvbiBuYW1lXG4vLyBcdFx0XHR9XG4vLyBcdFx0fSxcbi8vIFx0XHRyZW1vdmVkOiBmdW5jdGlvbiAoZG9jLCBpZHgpIHtcbi8vIFx0XHRcdGNvdW50LS07XG4vLyBcdFx0XHRzZWxmLmNoYW5nZWQoXCJjb3VudHNcIiwgc3BhY2VJZCwge2NvdW50OiBjb3VudH0pOyAgLy8gU2FtZSBwdWJsaXNoZWQgY29sbGVjdGlvbiwgXCJjb3VudHNcIlxuLy8gXHRcdH1cbi8vIFx0fSk7XG5cbi8vIFx0aW5pdGlhbGl6aW5nID0gZmFsc2U7XG5cbi8vIFx0Ly8gcHVibGlzaCB0aGUgaW5pdGlhbCBjb3VudC4gYG9ic2VydmVDaGFuZ2VzYCBndWFyYW50ZWVkIG5vdCB0byByZXR1cm5cbi8vIFx0Ly8gdW50aWwgdGhlIGluaXRpYWwgc2V0IG9mIGBhZGRlZGAgY2FsbGJhY2tzIGhhdmUgcnVuLCBzbyB0aGUgYGNvdW50YFxuLy8gXHQvLyB2YXJpYWJsZSBpcyB1cCB0byBkYXRlLlxuLy8gXHRzZWxmLmFkZGVkKFwiY291bnRzXCIsIHNwYWNlSWQsIHtjb3VudDogY291bnR9KTtcblxuLy8gXHQvLyBhbmQgc2lnbmFsIHRoYXQgdGhlIGluaXRpYWwgZG9jdW1lbnQgc2V0IGlzIG5vdyBhdmFpbGFibGUgb24gdGhlIGNsaWVudFxuLy8gXHRzZWxmLnJlYWR5KCk7XG5cbi8vIFx0Ly8gdHVybiBvZmYgb2JzZXJ2ZSB3aGVuIGNsaWVudCB1bnN1YnNjcmliZXNcbi8vIFx0c2VsZi5vblN0b3AoZnVuY3Rpb24gKCkge1xuLy8gXHRcdGhhbmRsZS5zdG9wKCk7XG4vLyBcdH0pO1xuLy8gfSk7XG5cblxuLy8gTWV0ZW9yLnB1Ymxpc2goXCJjb3VudC1hbGwtcGlubmVkXCIsIGZ1bmN0aW9uIChzcGFjZUlkKSB7XG4vLyBcdHZhciBzZWxmID0gdGhpcztcbi8vIFx0dmFyIHBpbm5lZENvdW50cyA9IDA7XG4vLyBcdHZhciBpbml0aWFsaXppbmcgPSB0cnVlO1xuXG4vLyBcdHZhciBoYW5kbGUgPSBQb3N0cy5maW5kKHtzcGFjZUlkOiBzcGFjZUlkLCBwaW5uZWQ6dHJ1ZX0pLm9ic2VydmVDaGFuZ2VzKHtcbi8vIFx0XHRhZGRlZDogZnVuY3Rpb24gKGRvYywgaWR4KSB7XG4vLyBcdFx0XHRwaW5uZWRDb3VudHMrKztcbi8vIFx0XHRcdGlmICghaW5pdGlhbGl6aW5nKSB7XG4vLyBcdFx0XHRcdHNlbGYuY2hhbmdlZChcInBpbm5lZENvdW50c1wiLCBzcGFjZUlkLCB7Y291bnQ6IHBpbm5lZENvdW50c30pOyAgLy8gXCJjb3VudHNcIiBpcyB0aGUgcHVibGlzaGVkIGNvbGxlY3Rpb24gbmFtZVxuLy8gXHRcdFx0fVxuLy8gXHRcdH0sXG4vLyBcdFx0cmVtb3ZlZDogZnVuY3Rpb24gKGRvYywgaWR4KSB7XG4vLyBcdFx0XHRwaW5uZWRDb3VudHMtLTtcbi8vIFx0XHRcdHNlbGYuY2hhbmdlZChcInBpbm5lZENvdW50c1wiLCBzcGFjZUlkLCB7Y291bnQ6IHBpbm5lZENvdW50c30pOyAgLy8gU2FtZSBwdWJsaXNoZWQgY29sbGVjdGlvbiwgXCJjb3VudHNcIlxuLy8gXHRcdH1cbi8vIFx0fSk7XG5cbi8vIFx0aW5pdGlhbGl6aW5nID0gZmFsc2U7XG5cbi8vIFx0Ly8gcHVibGlzaCB0aGUgaW5pdGlhbCBjb3VudC4gYG9ic2VydmVDaGFuZ2VzYCBndWFyYW50ZWVkIG5vdCB0byByZXR1cm5cbi8vIFx0Ly8gdW50aWwgdGhlIGluaXRpYWwgc2V0IG9mIGBhZGRlZGAgY2FsbGJhY2tzIGhhdmUgcnVuLCBzbyB0aGUgYGNvdW50YFxuLy8gXHQvLyB2YXJpYWJsZSBpcyB1cCB0byBkYXRlLlxuLy8gXHRzZWxmLmFkZGVkKFwicGlubmVkQ291bnRzXCIsIHNwYWNlSWQsIHtjb3VudDogcGlubmVkQ291bnRzfSk7XG5cbi8vIFx0Ly8gYW5kIHNpZ25hbCB0aGF0IHRoZSBpbml0aWFsIGRvY3VtZW50IHNldCBpcyBub3cgYXZhaWxhYmxlIG9uIHRoZSBjbGllbnRcbi8vIFx0c2VsZi5yZWFkeSgpO1xuXG4vLyBcdC8vIHR1cm4gb2ZmIG9ic2VydmUgd2hlbiBjbGllbnQgdW5zdWJzY3JpYmVzXG4vLyBcdHNlbGYub25TdG9wKGZ1bmN0aW9uICgpIHtcbi8vIFx0XHRoYW5kbGUuc3RvcCgpO1xuLy8gXHR9KTtcbi8vIH0pO1xuXG5cbi8vIE1ldGVvci5wdWJsaXNoKFwiY291bnQtYWxsLWZpbGVzXCIsIGZ1bmN0aW9uIChzcGFjZUlkKSB7XG4vLyBcdHZhciBzZWxmID0gdGhpcztcbi8vIFx0dmFyIGZpbGVzQ291bnRzID0gMDtcbi8vIFx0dmFyIGluaXRpYWxpemluZyA9IHRydWU7XG5cbi8vIFx0Ly92YXIgaGFuZGxlID0gUG9zdHMuZmluZCh7c3BhY2VJZDogc3BhY2VJZCwgJG9yIDogW3tmaWxlRXh0OlwidHh0XCJ9LHtmaWxlRXh0OlwicnRmXCJ9LHtmaWxlRXh0OlwicGRmXCJ9LHtmaWxlRXh0OlwiemlwXCJ9XX0pLm9ic2VydmVDaGFuZ2VzKHtcblxuLy8gXHR2YXIgaGFuZGxlID0gUG9zdHMuZmluZCh7c3BhY2VJZDogc3BhY2VJZCwgJGFuZCA6IFt7ZmlsZUlkOnskZXhpc3RzOnRydWV9IH0se2ZpbGVJZDp7JG5lOmZhbHNlfSB9LHtmaWxlRXh0OnskbmluIDogW1wianBnXCIsXCJqcGVnXCIsXCJwbmdcIixcImdpZlwiXX19XX0pLm9ic2VydmVDaGFuZ2VzKHtcbi8vIFx0XHRhZGRlZDogZnVuY3Rpb24gKGRvYywgaWR4KSB7XG4vLyBcdFx0XHRmaWxlc0NvdW50cysrO1xuLy8gXHRcdFx0aWYgKCFpbml0aWFsaXppbmcpIHtcbi8vIFx0XHRcdFx0c2VsZi5jaGFuZ2VkKFwiZmlsZXNDb3VudHNcIiwgc3BhY2VJZCwge2NvdW50OiBmaWxlc0NvdW50c30pOyAgLy8gXCJjb3VudHNcIiBpcyB0aGUgcHVibGlzaGVkIGNvbGxlY3Rpb24gbmFtZVxuLy8gXHRcdFx0fVxuLy8gXHRcdH0sXG4vLyBcdFx0cmVtb3ZlZDogZnVuY3Rpb24gKGRvYywgaWR4KSB7XG4vLyBcdFx0XHRmaWxlc0NvdW50cy0tO1xuLy8gXHRcdFx0c2VsZi5jaGFuZ2VkKFwiZmlsZXNDb3VudHNcIiwgc3BhY2VJZCwge2NvdW50OiBmaWxlc0NvdW50c30pOyAgLy8gU2FtZSBwdWJsaXNoZWQgY29sbGVjdGlvbiwgXCJjb3VudHNcIlxuLy8gXHRcdH1cbi8vIFx0fSk7XG5cbi8vIFx0aW5pdGlhbGl6aW5nID0gZmFsc2U7XG5cbi8vIFx0Ly8gcHVibGlzaCB0aGUgaW5pdGlhbCBjb3VudC4gYG9ic2VydmVDaGFuZ2VzYCBndWFyYW50ZWVkIG5vdCB0byByZXR1cm5cbi8vIFx0Ly8gdW50aWwgdGhlIGluaXRpYWwgc2V0IG9mIGBhZGRlZGAgY2FsbGJhY2tzIGhhdmUgcnVuLCBzbyB0aGUgYGNvdW50YFxuLy8gXHQvLyB2YXJpYWJsZSBpcyB1cCB0byBkYXRlLlxuLy8gXHRzZWxmLmFkZGVkKFwiZmlsZXNDb3VudHNcIiwgc3BhY2VJZCwge2NvdW50OiBmaWxlc0NvdW50c30pO1xuXG4vLyBcdC8vIGFuZCBzaWduYWwgdGhhdCB0aGUgaW5pdGlhbCBkb2N1bWVudCBzZXQgaXMgbm93IGF2YWlsYWJsZSBvbiB0aGUgY2xpZW50XG4vLyBcdHNlbGYucmVhZHkoKTtcblxuLy8gXHQvLyB0dXJuIG9mZiBvYnNlcnZlIHdoZW4gY2xpZW50IHVuc3Vic2NyaWJlc1xuLy8gXHRzZWxmLm9uU3RvcChmdW5jdGlvbiAoKSB7XG4vLyBcdFx0aGFuZGxlLnN0b3AoKTtcbi8vIFx0fSk7XG4vLyB9KTtcblxuXG4vLyBNZXRlb3IucHVibGlzaChcImNvdW50LWFsbC1pbWFnZXNcIiwgZnVuY3Rpb24gKHNwYWNlSWQpIHtcbi8vIFx0dmFyIHNlbGYgPSB0aGlzO1xuLy8gXHR2YXIgaW1hZ2VzQ291bnRzID0gMDtcbi8vIFx0dmFyIGluaXRpYWxpemluZyA9IHRydWU7XG5cbi8vIFx0dmFyIGhhbmRsZSA9IFBvc3RzLmZpbmQoe3NwYWNlSWQ6IHNwYWNlSWQsICRvciA6IFt7ZmlsZUV4dDpcImpwZ1wifSx7ZmlsZUV4dDpcImpwZWdcIn0se2ZpbGVFeHQ6XCJnaWZcIn0se2ZpbGVFeHQ6XCJwbmdcIn1dfSkub2JzZXJ2ZUNoYW5nZXMoe1xuLy8gXHRcdGFkZGVkOiBmdW5jdGlvbiAoZG9jLCBpZHgpIHtcbi8vIFx0XHRcdGltYWdlc0NvdW50cysrO1xuLy8gXHRcdFx0aWYgKCFpbml0aWFsaXppbmcpIHtcbi8vIFx0XHRcdFx0c2VsZi5jaGFuZ2VkKFwiaW1hZ2VzQ291bnRzXCIsIHNwYWNlSWQsIHtjb3VudDogaW1hZ2VzQ291bnRzfSk7ICAvLyBcImNvdW50c1wiIGlzIHRoZSBwdWJsaXNoZWQgY29sbGVjdGlvbiBuYW1lXG4vLyBcdFx0XHR9XG4vLyBcdFx0fSxcbi8vIFx0XHRyZW1vdmVkOiBmdW5jdGlvbiAoZG9jLCBpZHgpIHtcbi8vIFx0XHRcdGltYWdlc0NvdW50cy0tO1xuLy8gXHRcdFx0c2VsZi5jaGFuZ2VkKFwiaW1hZ2VzQ291bnRzXCIsIHNwYWNlSWQsIHtjb3VudDogaW1hZ2VzQ291bnRzfSk7ICAvLyBTYW1lIHB1Ymxpc2hlZCBjb2xsZWN0aW9uLCBcImNvdW50c1wiXG4vLyBcdFx0fVxuLy8gXHR9KTtcblxuLy8gXHRpbml0aWFsaXppbmcgPSBmYWxzZTtcblxuLy8gXHQvLyBwdWJsaXNoIHRoZSBpbml0aWFsIGNvdW50LiBgb2JzZXJ2ZUNoYW5nZXNgIGd1YXJhbnRlZWQgbm90IHRvIHJldHVyblxuLy8gXHQvLyB1bnRpbCB0aGUgaW5pdGlhbCBzZXQgb2YgYGFkZGVkYCBjYWxsYmFja3MgaGF2ZSBydW4sIHNvIHRoZSBgY291bnRgXG4vLyBcdC8vIHZhcmlhYmxlIGlzIHVwIHRvIGRhdGUuXG4vLyBcdHNlbGYuYWRkZWQoXCJpbWFnZXNDb3VudHNcIiwgc3BhY2VJZCwge2NvdW50OiBpbWFnZXNDb3VudHN9KTtcblxuLy8gXHQvLyBhbmQgc2lnbmFsIHRoYXQgdGhlIGluaXRpYWwgZG9jdW1lbnQgc2V0IGlzIG5vdyBhdmFpbGFibGUgb24gdGhlIGNsaWVudFxuLy8gXHRzZWxmLnJlYWR5KCk7XG5cbi8vIFx0Ly8gdHVybiBvZmYgb2JzZXJ2ZSB3aGVuIGNsaWVudCB1bnN1YnNjcmliZXNcbi8vIFx0c2VsZi5vblN0b3AoZnVuY3Rpb24gKCkge1xuLy8gXHRcdGhhbmRsZS5zdG9wKCk7XG4vLyBcdH0pO1xuLy8gfSk7XG5cblxuXG4vLyBNZXRlb3IucHVibGlzaChcImNvdW50LWFsbC1saXZlLWZlZWRcIiwgZnVuY3Rpb24gKHNwYWNlSWQpIHtcbi8vIFx0dmFyIHNlbGYgPSB0aGlzO1xuLy8gXHR2YXIgbGl2ZUZlZWRDb3VudHMgPSAwO1xuLy8gXHR2YXIgaW5pdGlhbGl6aW5nID0gdHJ1ZTtcblxuLy8gXHR2YXIgaGFuZGxlID0gUG9zdHMuZmluZCh7c3BhY2VJZDogc3BhY2VJZCwgdHlwZTonbGl2ZUZlZWQnfSkub2JzZXJ2ZUNoYW5nZXMoe1xuLy8gXHRcdGFkZGVkOiBmdW5jdGlvbiAoZG9jLCBpZHgpIHtcbi8vIFx0XHRcdGxpdmVGZWVkQ291bnRzKys7XG4vLyBcdFx0XHRpZiAoIWluaXRpYWxpemluZykge1xuLy8gXHRcdFx0XHRzZWxmLmNoYW5nZWQoXCJsaXZlRmVlZENvdW50c1wiLCBzcGFjZUlkLCB7Y291bnQ6IGxpdmVGZWVkQ291bnRzfSk7ICAvLyBcImNvdW50c1wiIGlzIHRoZSBwdWJsaXNoZWQgY29sbGVjdGlvbiBuYW1lXG4vLyBcdFx0XHR9XG4vLyBcdFx0fSxcbi8vIFx0XHRyZW1vdmVkOiBmdW5jdGlvbiAoZG9jLCBpZHgpIHtcbi8vIFx0XHRcdGxpdmVGZWVkQ291bnRzLS07XG4vLyBcdFx0XHRzZWxmLmNoYW5nZWQoXCJsaXZlRmVlZENvdW50c1wiLCBzcGFjZUlkLCB7Y291bnQ6IGxpdmVGZWVkQ291bnRzfSk7ICAvLyBTYW1lIHB1Ymxpc2hlZCBjb2xsZWN0aW9uLCBcImNvdW50c1wiXG4vLyBcdFx0fVxuLy8gXHR9KTtcblxuLy8gXHRpbml0aWFsaXppbmcgPSBmYWxzZTtcblxuLy8gXHQvLyBwdWJsaXNoIHRoZSBpbml0aWFsIGNvdW50LiBgb2JzZXJ2ZUNoYW5nZXNgIGd1YXJhbnRlZWQgbm90IHRvIHJldHVyblxuLy8gXHQvLyB1bnRpbCB0aGUgaW5pdGlhbCBzZXQgb2YgYGFkZGVkYCBjYWxsYmFja3MgaGF2ZSBydW4sIHNvIHRoZSBgY291bnRgXG4vLyBcdC8vIHZhcmlhYmxlIGlzIHVwIHRvIGRhdGUuXG4vLyBcdHNlbGYuYWRkZWQoXCJsaXZlRmVlZENvdW50c1wiLCBzcGFjZUlkLCB7Y291bnQ6IGxpdmVGZWVkQ291bnRzfSk7XG5cbi8vIFx0Ly8gYW5kIHNpZ25hbCB0aGF0IHRoZSBpbml0aWFsIGRvY3VtZW50IHNldCBpcyBub3cgYXZhaWxhYmxlIG9uIHRoZSBjbGllbnRcbi8vIFx0c2VsZi5yZWFkeSgpO1xuXG4vLyBcdC8vIHR1cm4gb2ZmIG9ic2VydmUgd2hlbiBjbGllbnQgdW5zdWJzY3JpYmVzXG4vLyBcdHNlbGYub25TdG9wKGZ1bmN0aW9uICgpIHtcbi8vIFx0XHRoYW5kbGUuc3RvcCgpO1xuLy8gXHR9KTtcbi8vIH0pOyIsImltcG9ydCB7IEZpbGVzIH0gZnJvbSAnLi4vaW1wb3J0cy9hcGkvZmlsZXMuanMnO1xuXG4vLyBVcGxvYWQgZmlsZXMgd2l0aCB0b21pdHJlc2NhazptZXRlb3ItdXBsb2Fkc1xuXG5NZXRlb3Iuc3RhcnR1cChmdW5jdGlvbiAoKSB7XG5cblx0VXBsb2FkU2VydmVyLmluaXQoe1xuXHRcdHRtcERpcjogTWV0ZW9yLnNldHRpbmdzLnVwbG9hZERpcisnL3RtcCcsXG5cdFx0dXBsb2FkRGlyOiBNZXRlb3Iuc2V0dGluZ3MudXBsb2FkRGlyLFxuXHRcdGNoZWNrQ3JlYXRlRGlyZWN0b3JpZXM6IHRydWUsXG5cdFx0Z2V0RGlyZWN0b3J5OiBmdW5jdGlvbihmaWxlSW5mbywgZm9ybURhdGEpIHtcblxuXHRcdFx0dmFyIHNwYWNlSWQgPSBmb3JtRGF0YS5zcGFjZUlkO1xuXHRcdFx0ZmlsZUluZm8uc3BhY2VJZCA9IHNwYWNlSWQ7XG5cblx0XHRcdHZhciBuZXdJRCA9IG5ldyBNb25nby5PYmplY3RJRCgpOyAvLyBNYW51YWxseSBnZW5lcmF0ZSBhIG5ldyBNb25nbyBpZFxuXHRcdFx0dmFyIGZpbGVJZCA9IG5ld0lELl9zdHI7XG5cdFx0XHRmaWxlSW5mby5maWxlSWQgPSBmaWxlSWQ7XG5cblx0XHRcdGlmIChmb3JtRGF0YS50eXBlID09ICdsaXZlRmVlZCcpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJVcGxvYWRpbmcgYSBsaXZlRmVlZCBmaWxlLi4uXCIpO1xuXHRcdFx0XHRyZXR1cm4gJy8nK3NwYWNlSWQrJy9saXZlRmVlZC8nO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoZm9ybURhdGEudHlwZSA9PSAncmVzb3VyY2UnKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiVXBsb2FkaW5nIGEgcmVzb3VyY2UuLi5cIik7XG5cdFx0XHRcdHJldHVybiAnLycrc3BhY2VJZCsnL3Jlc291cmNlLyc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChmb3JtRGF0YS50eXBlID09ICdsZXNzb24nKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiVXBsb2FkaW5nIGxlc3NvbiBmaWxlLi4uXCIpO1xuXHRcdFx0XHRyZXR1cm4gJy8nK3NwYWNlSWQrJy9sZXNzb24vJytmaWxlSWQ7XG5cdFx0XHR9XG5cdFx0XHQvLyBUT0RPIDogYWRkIG1vcmUgc2VjdXJpdHlcblx0XHRcdGVsc2UgaWYgKGZvcm1EYXRhLnR5cGUgPT0gJ3VwZGF0ZScpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJVcGxvYWRpbmcgdXBkYXRlIGZpbGVcIik7XG5cdFx0XHRcdHJldHVybiAnL3VwZGF0ZXMnO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICcvJztcblx0XHRcdFxuXHRcdH0sXG5cdFx0ZmluaXNoZWQ6IGZ1bmN0aW9uKGZpbGVJbmZvLCBmb3JtRmllbGRzLCBmb3JtRGF0YSkge1xuXG5cdFx0XHR2YXIgZmlsZU5hbWUgPSBmaWxlSW5mby5uYW1lLnN1YnN0cigwLCBmaWxlSW5mby5uYW1lLmxhc3RJbmRleE9mKCcuJykpIHx8IGZpbGVJbmZvLm5hbWU7XG5cdFx0XHRmaWxlSW5mby5maWxlTmFtZSA9IGZpbGVOYW1lO1xuXHRcdFx0Ly9maWxlSW5mby5maWxlTmFtZSA9IHVuZXNjYXBlKGZpbGVOYW1lKTsgLy8gQ2hlY2sgd2h5IHdlIHVuZXNjYXBlIGZpbGUgbmFtZSBpbiBnZXRGaWxlTmFtZSBtZXRob2RcblxuXHRcdFx0dmFyIGZpbGVFeHQgPSBmaWxlSW5mby5uYW1lLnN1YnN0cihmaWxlSW5mby5uYW1lLmxhc3RJbmRleE9mKCcuJykrMSkudG9Mb3dlckNhc2UoKTtcblx0XHRcdGZpbGVJbmZvLmZpbGVFeHQgPSBmaWxlRXh0O1xuXG5cdFx0XHRpZiAoZm9ybUZpZWxkcy50eXBlID09ICdsaXZlRmVlZCcgfHwgZm9ybUZpZWxkcy50eXBlID09ICdyZXNvdXJjZScpIHtcblx0XHRcdFx0aWYgKGZpbGVFeHQgPT0gXCJqcGdcIiB8fCBmaWxlRXh0ID09IFwianBlZ1wiIHx8IGZpbGVFeHQgPT0gXCJwbmdcIikge1xuXHRcdFx0XHRcdC8vIFJlc2l6ZSBhbmQgYXV0by1vcmllbnQgdXBsb2FkZWQgaW1hZ2VzIHdpdGggR3JhcGhpY01hZ2lja3Ncblx0XHRcdFx0XHRnbShNZXRlb3Iuc2V0dGluZ3MudXBsb2FkRGlyK2ZpbGVJbmZvLnBhdGgpLmF1dG9PcmllbnQoKS5yZXNpemUoJzEyMDAnLCcxMjAwJykud3JpdGUoTWV0ZW9yLnNldHRpbmdzLnVwbG9hZERpcitmaWxlSW5mby5wYXRoLE1ldGVvci5iaW5kRW52aXJvbm1lbnQoZnVuY3Rpb24gKGVycm9yLCByZXN1bHQpIHtcblx0XHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIkVycm9yIHdoZW4gcmVzaXppbmcgOlwiK2Vycm9yKTtcblx0XHRcdFx0XHRcdFx0dmFyIGVycm9yTWVzc2FnZSA9IFwiQW4gZXJyb3IgaGFzIG9jY3VyZWQuXCJcblx0XHRcdFx0XHRcdFx0RmlsZXMuaW5zZXJ0KHtfaWQ6IGZpbGVJbmZvLmZpbGVJZCwgZXJyb3I6ZXJyb3JNZXNzYWdlfSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRGaWxlcy5pbnNlcnQoe19pZDogZmlsZUluZm8uZmlsZUlkLCBmaWxlTmFtZTpmaWxlSW5mby5maWxlTmFtZSwgZmlsZUV4dDpmaWxlRXh0LCBmaWxlUGF0aDogZmlsZUluZm8ucGF0aH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRGaWxlcy5pbnNlcnQoe19pZDogZmlsZUluZm8uZmlsZUlkLCBmaWxlTmFtZTpmaWxlSW5mby5maWxlTmFtZSwgZmlsZUV4dDpmaWxlRXh0LCBmaWxlUGF0aDogZmlsZUluZm8ucGF0aH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChmb3JtRmllbGRzLnR5cGUgPT0gJ2xlc3NvbicpIHtcblx0XHRcdFx0Y21kID0gTWV0ZW9yLndyYXBBc3luYyhleGVjKTtcblx0XHRcdFx0cmVzID0gY21kKFwidW56aXAgJ1wiK01ldGVvci5zZXR0aW5ncy51cGxvYWREaXIrZmlsZUluZm8ucGF0aCtcIicgLWQgJ1wiK01ldGVvci5zZXR0aW5ncy51cGxvYWREaXIrXCIvXCIrZmlsZUluZm8uc3BhY2VJZCtcIi9sZXNzb24vXCIrZmlsZUluZm8uZmlsZUlkK1wiJ1wiLCB7bWF4QnVmZmVyIDogMTAyNCAqIDEwMjQgKiA2NH0sIGZ1bmN0aW9uKGVycm9yLHJlc3VsdCl7XG5cdFx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIkVycm9yIHdoZW4gdXBsb2FkaW5nIGEgbGVzc29uIDogXCIrZXJyb3IpO1xuXHRcdFx0XHRcdFx0dmFyIGVycm9yTWVzc2FnZSA9IFwiQW4gZXJyb3IgaGFzIG9jY3VyZWQuXCJcblx0XHRcdFx0XHRcdEZpbGVzLmluc2VydCh7X2lkOiBmaWxlSW5mby5maWxlSWQsIGVycm9yOmVycm9yTWVzc2FnZX0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XHRcdFx0XHRcblx0XHRcdFx0XHRcdEZpbGVzLmluc2VydCh7X2lkOiBmaWxlSW5mby5maWxlSWQsIGZpbGVOYW1lOmZpbGVJbmZvLmZpbGVOYW1lLCBmaWxlRXh0OmZpbGVFeHQsIGZpbGVQYXRoOiBmaWxlSW5mby5wYXRofSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXMyID0gY21kKFwicm0gJ1wiK01ldGVvci5zZXR0aW5ncy51cGxvYWREaXIrZmlsZUluZm8ucGF0aCtcIidcIik7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChmb3JtRmllbGRzLnR5cGUgPT0gJ3VwZGF0ZScpIHtcblx0XHRcdFx0Y21kID0gTWV0ZW9yLndyYXBBc3luYyhleGVjKTtcdFxuXHRcdFx0XHRyZXMgPSBjbWQoXCJ0YXIgenh2ZiAnXCIrTWV0ZW9yLnNldHRpbmdzLnVwbG9hZERpcitmaWxlSW5mby5wYXRoK1wiJyAtQyBcIitNZXRlb3Iuc2V0dGluZ3MudXBkYXRlRGlyLCB7bWF4QnVmZmVyIDogMTAyNCAqIDEwMjQgKiA2NH0sIGZ1bmN0aW9uKGVycm9yLHJlc3VsdCl7XG5cdFx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIkVycm9yIHdoZW4gdXBsb2FkaW5nIGFuIHVwZGF0ZSA6IFwiK2Vycm9yKTtcblx0XHRcdFx0XHRcdHZhciBlcnJvck1lc3NhZ2UgPSBcIkFuIGVycm9yIGhhcyBvY2N1cmVkLlwiXG5cdFx0XHRcdFx0XHRGaWxlcy5pbnNlcnQoe19pZDogZmlsZUluZm8uZmlsZUlkLCBlcnJvcjplcnJvck1lc3NhZ2V9KTtcblx0XHRcdFx0XHR9IGVsc2Uge1x0XHRcdFx0XG5cdFx0XHRcdFx0XHRGaWxlcy5pbnNlcnQoe19pZDogZmlsZUluZm8uZmlsZUlkLCBmaWxlTmFtZTpmaWxlSW5mby5maWxlTmFtZSwgZmlsZUV4dDpmaWxlRXh0LCBmaWxlUGF0aDogZmlsZUluZm8ucGF0aH0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmVzMiA9IGNtZChcInJtICdcIitNZXRlb3Iuc2V0dGluZ3MudXBsb2FkRGlyK2ZpbGVJbmZvLnBhdGgrXCInXCIsIHttYXhCdWZmZXIgOiAxMDI0ICogMTAyNCAqIDY0fSwpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Z2V0RmlsZU5hbWU6IGZ1bmN0aW9uKGZpbGVJbmZvLCBmb3JtRmllbGRzLCBmb3JtRGF0YSkgeyBcblxuXHRcdFx0dmFyIGZpbGVOYW1lID0gZmlsZUluZm8ubmFtZTtcdFxuXG5cdFx0XHQvL2ZpbGVOYW1lID0gZXNjYXBlKGZpbGVOYW1lKTtcblx0XHRcdC8vIFRoZSBmaWxlIG5hbWUgaXMgdXNlZCB0byBnZW5lcmF0ZSB0aGUgZmlsZSBwYXRoLCBzbyB3ZSBlc2NhcGUgdW5pY29kZSBjaGFyYWN0ZXJzXG5cdFx0XHQvLyBhbmQgdGhlbiB3ZSB1bmVzY2FwZSBpdCBpbiBmaW5pc2hlZCBtZXRob2QgdG8gc2F2ZSBpdCBpbiBodW1hbi1yZWFkYWJsZSB0ZXh0XG5cblx0XHRcdHJldHVybiBmaWxlTmFtZTtcblx0XHRcdC8vIHZhciBmaWxlRXh0ID0gZmlsZUluZm8ubmFtZS5zdWJzdHIoZmlsZUluZm8ubmFtZS5sYXN0SW5kZXhPZignLicpKzEpLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdC8vIC8vIElmIGZpbGUgaXMgYW4gaW1hZ2UsIHNldCBhIHJhbmRvbSBuYW1lXG5cdFx0XHQvLyBpZiAoZmlsZUV4dCA9PSBcImpwZ1wiIHx8IGZpbGVFeHQgPT0gXCJqcGVnXCIgfHwgZmlsZUV4dCA9PSBcInBuZ1wiKSB7XG5cdFx0XHQvLyBcdHZhciBuZXdOYW1lID0gUmFuZG9tLmlkKCkgKyAnLicgKyBmaWxlRXh0O1xuXHRcdFx0Ly8gXHRyZXR1cm4gbmV3TmFtZTtcblx0XHRcdC8vIH1cblx0XHRcdC8vIGVsc2Uge1xuXHRcdFx0Ly8gXHR2YXIgZmlsZU5hbWUgPSBmaWxlSW5mby5uYW1lO1x0XG5cblx0XHRcdC8vIFx0ZmlsZU5hbWUgPSBlbmNvZGVVUklDb21wb25lbnQoZmlsZU5hbWUpO1xuXG5cdFx0XHQvLyBcdHJldHVybiBmaWxlTmFtZTtcblx0XHRcdC8vIH1cblx0XHR9LFxuXHRcdGNhY2hlVGltZTogMCxcbiAgXHR9KTtcbn0pOyIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuXG5pbXBvcnQgJy4uL3NlcnZlci9maXh0dXJlcy5qcyc7XG5pbXBvcnQgJy4uL3NlcnZlci9wdWJsaWNhdGlvbnMuanMnO1xuaW1wb3J0ICcuLi9zZXJ2ZXIvdXBsb2Fkcy5qcyc7XG5pbXBvcnQgJy4uL3NlcnZlci9wZXJtaXNzaW9ucy5qcyc7XG5pbXBvcnQgJy4uL2xpYi9hcHBfbG9hZGVyLmpzJztcblxuXG5NZXRlb3Iuc3RhcnR1cCgoKSA9PiB7XG5cblx0TWV0ZW9yLnB1Ymxpc2gobnVsbCwgZnVuY3Rpb24gKCkge1xuXHQgICAgcmV0dXJuIE1ldGVvci5yb2xlQXNzaWdubWVudC5maW5kKCk7XG5cbn0pO1xuICAvLyBjb2RlIHRvIHJ1biBvbiBzZXJ2ZXIgYXQgc3RhcnR1cFxuXG5cdC8vIENvbm5lY3QgQWNjb3VudHMgdG8gcmVtb3RlIEFwcFxuXHQvL01ldGVvci5jb25uZWN0aW9uID0gRERQLmNvbm5lY3QoJ2h0dHA6Ly9iZWVrZWUuYm94OjgwJyk7XG5cdC8vIFJlbW90ZSA9IEREUC5jb25uZWN0KCdodHRwOi8vYmVla2VlLmJveDo4MCcpO1xuXHQvLyBBY2NvdW50cy5jb25uZWN0aW9uID0gUmVtb3RlO1xuXHQvLyBNZXRlb3IudXNlcnMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbigndXNlcnMnLCBSZW1vdGUpO1xuXHQvLyAgQWNjb3VudHMuY29ubmVjdGlvbi5zdWJzY3JpYmUoJ3VzZXJzJyk7XG4vLyBfX21ldGVvcl9ydW50aW1lX2NvbmZpZ19fLkFDQ09VTlRTX0NPTk5FQ1RJT05fVVJMID0gJ2h0dHA6Ly9iZWVrZWUuYm94OjgwJztcblxuLy8gdmFyIGNvbm5lY3Rpb24gPSBERFAuY29ubmVjdChcImh0dHA6Ly9iZWVrZWUuYm94OjgwXCIpO1xuLy8gQWNjb3VudHMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XG4vLyBNZXRlb3IudXNlcnMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcInVzZXJzXCIsIHtjb25uZWN0aW9uOiBjb25uZWN0aW9ufSk7XG5cbn0pO1xuIl19
