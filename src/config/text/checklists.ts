/**
 * The Act checklists in German, French and Italian. English is the source
 * (src/config/checklists.ts); each translation has the same steps in the same
 * order, and a detail exactly where English has one (checklists.test.ts), so
 * progress ticked in one language is the same progress in another.
 */
import { CHECKLISTS, type Checklist } from "../checklists";
import type { Locale } from "@/i18n/locales";

export type ChecklistWords = {
  title: string;
  when: string;
  steps: readonly { text: string; detail?: string }[];
};

type Slug = (typeof CHECKLISTS)[number]["slug"];
type Translations = Record<Slug, ChecklistWords>;

const DE: Translations = {
  "phone-and-accounts": {
    title: "Telefon und Konten absichern",
    when: "Du hast es nie richtig gemacht, oder du hast gerade ein neues Telefon.",
    steps: [
      { text: "Installier einen Passwortmanager und speichere darin dein E-Mail-Passwort.", detail: "Bitwarden, 1Password oder der, der in dein Telefon eingebaut ist. Ändere dann das E-Mail-Passwort in ein langes, zufälliges." },
      { text: "Füg deinem wichtigsten E-Mail-Konto einen Passkey oder Sicherheitsschlüssel hinzu.", detail: "Einstellungen → Sicherheit bei deinem E-Mail-Anbieter. Das ist das Konto, mit dem sich alle anderen zurücksetzen lassen." },
      { text: "Entferne Wiederherstellungs-Nummern und -Adressen, die du nicht mehr kontrollierst." },
      { text: "Schalte die Zwei-Schritt-Anmeldung für Bank, Cloud-Speicher und soziale Konten ein.", detail: "Eine Authenticator-App oder ein Passkey, wo angeboten; SMS nur, wo es nichts anderes gibt." },
      { text: "Verlang bei deinem Mobilfunkanbieter eine PIN für den Wechsel deiner Nummer auf eine neue SIM." },
      { text: "Stell einen Telefon-Code mit mehr als sechs Ziffern ein.", detail: "Und blende die Vorschau von Nachrichten auf dem Sperrbildschirm aus." },
      { text: "Prüf, ob die Festplatte deines Laptops verschlüsselt ist.", detail: "Mac: FileVault. Windows: Geräteverschlüsselung oder BitLocker. Linux: LUKS." },
      { text: "Schalte automatische Updates für Telefon, Laptop und Browser ein." },
      { text: "Schreib Wiederherstellungscodes auf und bewahre sie beim Pass auf." },
    ],
  },
  "night-out": {
    title: "Vor dem Ausgang",
    when: "Heute Abend raus, besonders an einen neuen Ort.",
    steps: [
      { text: "Lad dein Telefon auf, und nimm eine kleine Powerbank mit, wenn es spät wird." },
      { text: "Kenne deinen Heimweg und das letzte Tram oder den letzten Zug.", detail: "Und halte eine Taxi-App als Reserve bereit." },
      { text: "Sag einer Person, wo du sein wirst und ungefähr wann du heimkommst." },
      { text: "Trag Schuhe, in denen du rennen könntest." },
      { text: "Merk dir beim Ankommen zwei Ausgänge." },
      { text: "Behalte dein Getränk bei dir; wenn es komisch schmeckt, hör auf und sag es jemandem." },
      { text: "Vereinbart unter Freunden, dass niemand allein geht, ohne Bescheid zu sagen." },
    ],
  },
  "party-or-festival": {
    title: "Vor einer Party oder einem Festival",
    when: "Eine lange Nacht mit Alkohol oder anderen Drogen in der Nähe, deinen oder denen deiner Freunde.",
    steps: [
      { text: "Wenn du etwas nehmen wirst, lass es vorher testen.", detail: "Das Drug Checking von Saferparty in Zürich ist gratis und anonym, mit Termin." },
      { text: "Leg deine Grenze und deine Schlusszeit jetzt fest, solange du nüchtern bist." },
      { text: "Iss vorher richtig." },
      { text: "Vereinbart unter Freunden, zusammenzubleiben und einander zu sagen, was ihr genommen habt." },
      { text: "Plan den Heimweg, und wer nicht fährt." },
      { text: "Speichere 144 (Ambulanz) und 145 (Tox Info) in deinem Telefon." },
      { text: "Lern die Seitenlage, bevor du sie brauchst." },
    ],
  },
  "long-drive": {
    title: "Vor einer langen Fahrt",
    when: "Ein paar Stunden auf der Strasse, ein Pass, oder eine Fahrt in der Nacht.",
    steps: [
      { text: "Stell Route und Musik ein, bevor du losfährst." },
      { text: "Leg das Telefon ausser Reichweite, oder auf «Nicht stören» während der Fahrt." },
      { text: "Kein Alkohol vor der Fahrt.", detail: "Neulenker und Berufschauffeure dürfen gar nicht unter Alkoholeinfluss fahren." },
      { text: "Plan alle paar Stunden eine Pause, und halt früher an, wenn du müde bist." },
      { text: "Prüf, ob Pannendreieck, Leuchtweste und Apotheke im Auto sind." },
      { text: "Prüf Wetter und Passverhältnisse auf der Strecke." },
      { text: "Sag jemandem, wann du ankommen willst." },
    ],
  },
  "before-a-swim": {
    title: "Vor dem Schwimmen im See oder Fluss",
    when: "Ein Schwumm, ein Böötle auf dem Fluss oder ein Nachmittag am See.",
    steps: [
      { text: "Kein Alkohol und keine Drogen, bevor du ins Wasser gehst." },
      { text: "Kühl dich langsam ab; spring nie überhitzt ins Wasser." },
      { text: "Wisse am Fluss, wo du aussteigst, und den Ausstieg danach." },
      { text: "Spring nicht in Wasser, dessen Grund du nicht siehst." },
      { text: "Geh mit jemandem, oder sag es jemandem am Ufer." },
      { text: "Kinder immer in Griffnähe." },
      { text: "Je kälter das Wasser, desto kürzer der Schwumm." },
    ],
  },
  "protest-near-my-shop": {
    title: "Eine Demonstration zieht an meinem Laden vorbei",
    when: "Eine Demonstration ist in deiner Strasse oder in der Nähe angekündigt.",
    steps: [
      { text: "Lies die Mitteilung der Stadtpolizei: Route, Zeit, gesperrte Strassen." },
      { text: "Leg deine Schliesszeit jetzt fest, vor dem Tag, und sag es deinem Personal." },
      { text: "Nimm Bargeld, Wertsachen und die teuerste Ware aus dem Schaufenster und vom Verkaufsboden." },
      { text: "Fotografiere Laden und Ware für die Versicherung." },
      { text: "Prüf, ob deine Versicherung Schäden durch Unruhen deckt, und was sie von dir verlangt." },
      { text: "Vereinbare mit den Nachbarläden, wer die 117 anruft und wie ihr einander erreicht." },
      { text: "Organisiere Rollläden, Sicherheitsfolie oder Platten, wenn dein Glas exponiert ist.", detail: "Ein Handwerker braucht Vorlauf; das ist der Schritt, mit dem du zuerst beginnst." },
      { text: "Wenn du beim Schliessen Leute bei dir willst, frag früh nach Protectors.", detail: "Sie schützen dich und dein Personal und rufen die 117; sie stellen sich keiner Menge entgegen." },
      { text: "Am Tag: pünktlich schliessen, zusammen gehen, und nicht zurück, um Ware zu verteidigen." },
    ],
  },
  "before-you-travel": {
    title: "Vor der Reise",
    when: "Eine Reise ins Ausland, besonders an einen unbekannten Ort.",
    steps: [
      { text: "Lies die Reisehinweise des EDA für das Land." },
      { text: "Erfasse die Reise in der App Travel Admin." },
      { text: "Kläre Impfungen und Gesundheitshinweise für das Reiseziel." },
      { text: "Speichere die lokale Notrufnummer und die Nummer deiner Botschaft im Telefon." },
      { text: "Fotografiere deinen Pass und behalte eine Kopie offline." },
      { text: "Frag deine Gastgeber oder dein Hotel, welche Gegenden Einheimische meiden, und wann." },
      { text: "Lies nach, welche Touristenfallen dort üblich sind." },
      { text: "Lass deinen Reiseplan bei jemandem zu Hause." },
    ],
  },
  "family-emergency-plan": {
    title: "Euer Notfallplan als Familie",
    when: "Einmal im Jahr, oder wann immer sich der Haushalt ändert.",
    steps: [
      { text: "Vereinbart einen Treffpunkt nahe beim Haus und einen weiter weg." },
      { text: "Sorgt dafür, dass jedes Kind die Nummer eines Elternteils auswendig kennt." },
      { text: "Bestimmt eine Kontaktperson ausserhalb des Haushalts, bei der sich alle melden." },
      { text: "Installiert die App Alertswiss und lernt, was die Sirenen bedeuten." },
      { text: "Wisst, wo Gas- und Wasserhahn abzustellen sind, und wo die Apotheke ist." },
      { text: "Bewahrt Kopien von Dokumenten, etwas Bargeld und Ersatzmedikamente zusammen auf." },
      { text: "Übt einmal: wer macht was, wer holt wen ab." },
    ],
  },
  "is-this-a-scam": {
    title: "Ist das Betrug? Jetzt gerade",
    when: "Jemand will Geld, Codes oder Zugang, und es fühlt sich dringend an.",
    steps: [
      { text: "Halt. Zahl nichts, überweise nichts, klick nichts und lies noch keinen Code vor." },
      { text: "Leg auf oder schliess die Nachricht." },
      { text: "Such die Nummer der Organisation selbst heraus und ruf dort an.", detail: "Nie die Nummer, den Link oder die App benutzen, die dir die Person gegeben hat." },
      { text: "Erzähl einer Person, der du vertraust, was passiert." },
      { text: "Wenn du schon bezahlt hast, ruf jetzt deine Bank an, unter der Nummer auf deiner Karte." },
      { text: "Bewahre alles auf: Nachrichten, Nummern, Transaktionsnummern, und erstatte Anzeige bei der Polizei." },
    ],
  },
  "right-after-an-incident": {
    title: "Direkt nachdem etwas passiert ist",
    when: "Du wurdest angegriffen, bedroht, beraubt oder verfolgt.",
    steps: [
      { text: "Geh an einen sicheren Ort, mit Menschen und Licht." },
      { text: "Wenn jemand verletzt oder in Gefahr ist, ruf 144 oder 117 an." },
      { text: "Schreib auf, woran du dich erinnerst, solange es frisch ist: Zeit, Ort, Gesichter, Worte, Fahrzeuge." },
      { text: "Lass dich untersuchen, auch wenn es dir gut geht.", detail: "Ein Schock verdeckt Verletzungen." },
      { text: "Erstatte Anzeige bei der Polizei, und behalte die Fallnummer." },
      { text: "Erzähl einer nahestehenden Person, was passiert ist." },
      { text: "In der Schweiz helfen die Opferhilfe-Beratungsstellen gratis und vertraulich." },
    ],
  },
};

const FR: Translations = {
  "phone-and-accounts": {
    title: "Sécuriser votre téléphone et vos comptes",
    when: "Vous ne l'avez jamais vraiment fait, ou vous venez d'avoir un nouveau téléphone.",
    steps: [
      { text: "Installez un gestionnaire de mots de passe et enregistrez-y le mot de passe de votre e-mail.", detail: "Bitwarden, 1Password, ou celui intégré à votre téléphone. Changez ensuite le mot de passe de l'e-mail pour un long mot de passe aléatoire." },
      { text: "Ajoutez une clé d'accès (passkey) ou une clé de sécurité à votre compte e-mail principal.", detail: "Réglages → Sécurité chez votre fournisseur e-mail. C'est le compte qui permet de réinitialiser tous les autres." },
      { text: "Supprimez les numéros et adresses de récupération que vous ne contrôlez plus." },
      { text: "Activez la connexion en deux étapes pour votre banque, votre stockage en ligne et vos réseaux sociaux.", detail: "Une application d'authentification ou une passkey quand c'est proposé ; le SMS seulement quand il n'y a rien d'autre." },
      { text: "Demandez à votre opérateur un code PIN pour tout transfert de votre numéro vers une nouvelle SIM." },
      { text: "Choisissez un code de téléphone de plus de six chiffres.", detail: "Et masquez l'aperçu des messages sur l'écran verrouillé." },
      { text: "Vérifiez que le disque de votre ordinateur portable est chiffré.", detail: "Mac : FileVault. Windows : chiffrement de l'appareil ou BitLocker. Linux : LUKS." },
      { text: "Activez les mises à jour automatiques du téléphone, de l'ordinateur et du navigateur." },
      { text: "Notez vos codes de récupération et rangez-les avec votre passeport." },
    ],
  },
  "night-out": {
    title: "Avant une soirée",
    when: "Vous sortez ce soir, surtout dans un endroit nouveau.",
    steps: [
      { text: "Chargez votre téléphone, et prenez une petite batterie si la soirée finit tard." },
      { text: "Connaissez votre chemin du retour et le dernier tram ou train.", detail: "Et gardez une application de taxi en réserve." },
      { text: "Dites à une personne où vous serez et à peu près quand vous rentrerez." },
      { text: "Portez des chaussures avec lesquelles vous pourriez courir." },
      { text: "En arrivant, repérez deux sorties." },
      { text: "Gardez votre verre avec vous ; s'il a un goût bizarre, arrêtez et prévenez quelqu'un." },
      { text: "Convenez entre amis que personne ne part seul sans le dire." },
    ],
  },
  "party-or-festival": {
    title: "Avant une fête ou un festival",
    when: "Une longue nuit avec de l'alcool ou d'autres drogues autour, les vôtres ou celles de vos amis.",
    steps: [
      { text: "Si vous allez prendre quelque chose, faites-le analyser avant.", detail: "Le drug checking de Saferparty à Zurich est gratuit et anonyme, sur rendez-vous." },
      { text: "Fixez votre limite et votre heure d'arrêt maintenant, à jeun." },
      { text: "Mangez un vrai repas avant de partir." },
      { text: "Convenez entre amis de rester ensemble et de vous dire ce que vous avez pris." },
      { text: "Prévoyez le retour, et qui ne conduit pas." },
      { text: "Enregistrez le 144 (ambulance) et le 145 (Tox Info) dans votre téléphone." },
      { text: "Apprenez la position latérale de sécurité avant d'en avoir besoin." },
    ],
  },
  "long-drive": {
    title: "Avant un long trajet en voiture",
    when: "Quelques heures de route, un col, ou un trajet de nuit.",
    steps: [
      { text: "Réglez l'itinéraire et la musique avant de partir." },
      { text: "Mettez le téléphone hors de portée, ou en « ne pas déranger » pendant la conduite." },
      { text: "Pas d'alcool avant de conduire.", detail: "Les nouveaux conducteurs et les chauffeurs professionnels ne peuvent pas conduire sous son influence du tout." },
      { text: "Prévoyez une pause toutes les deux heures environ, et arrêtez-vous plus tôt si vous êtes fatigué." },
      { text: "Vérifiez que le triangle de panne, un gilet de sécurité et la trousse de secours sont dans la voiture." },
      { text: "Vérifiez la météo et l'état des cols sur le trajet." },
      { text: "Dites à quelqu'un quand vous comptez arriver." },
    ],
  },
  "before-a-swim": {
    title: "Avant de nager dans un lac ou une rivière",
    when: "Une baignade, une descente de rivière ou un après-midi au lac.",
    steps: [
      { text: "Ni alcool ni drogues avant d'entrer dans l'eau." },
      { text: "Rafraîchissez-vous lentement ; ne sautez jamais dans l'eau en ayant trop chaud." },
      { text: "En rivière, sachez où vous sortirez, et la sortie suivante." },
      { text: "Ne sautez pas dans une eau dont vous ne voyez pas le fond." },
      { text: "Allez-y avec quelqu'un, ou prévenez quelqu'un sur la rive." },
      { text: "Les enfants toujours à portée de main." },
      { text: "Plus l'eau est froide, plus la baignade est courte." },
    ],
  },
  "protest-near-my-shop": {
    title: "Une manifestation passe devant mon magasin",
    when: "Une manifestation est annoncée dans votre rue ou à proximité.",
    steps: [
      { text: "Lisez l'annonce de la police municipale : le parcours, l'heure, les rues fermées." },
      { text: "Fixez votre heure de fermeture maintenant, avant le jour, et dites-le à votre personnel." },
      { text: "Retirez l'argent liquide, les objets de valeur et les articles les plus chers de la vitrine et de la surface de vente." },
      { text: "Photographiez le magasin et le stock pour l'assurance." },
      { text: "Vérifiez que votre assurance couvre les dommages dus aux émeutes, et ce qu'elle exige de vous." },
      { text: "Convenez avec les commerces voisins de qui appelle le 117 et de comment vous vous joignez." },
      { text: "Prévoyez des volets, un film de sécurité ou des panneaux si votre vitrine est exposée.", detail: "Un artisan a besoin de temps ; c'est la mesure à lancer en premier." },
      { text: "Si vous voulez du monde avec vous pendant la fermeture, demandez des Protectors tôt.", detail: "Ils vous protègent, vous et votre personnel, et appellent le 117 ; ils ne font pas face à une foule." },
      { text: "Le jour même : fermez à l'heure, partez ensemble, et ne revenez pas défendre le stock." },
    ],
  },
  "before-you-travel": {
    title: "Avant de voyager",
    when: "Un voyage à l'étranger, surtout dans un endroit inconnu.",
    steps: [
      { text: "Lisez les conseils aux voyageurs du DFAE pour le pays." },
      { text: "Enregistrez le voyage dans l'application Travel Admin." },
      { text: "Vérifiez les vaccins et les conseils de santé pour la destination." },
      { text: "Enregistrez le numéro d'urgence local et celui de votre ambassade dans votre téléphone." },
      { text: "Photographiez votre passeport et gardez une copie hors ligne." },
      { text: "Demandez à votre hôte ou à votre hôtel quels quartiers les habitants évitent, et à quelle heure." },
      { text: "Renseignez-vous sur les arnaques aux touristes courantes là-bas." },
      { text: "Laissez votre itinéraire à quelqu'un à la maison." },
    ],
  },
  "family-emergency-plan": {
    title: "Votre plan d'urgence familial",
    when: "Une fois par an, ou chaque fois que le foyer change.",
    steps: [
      { text: "Convenez d'un point de rencontre près de chez vous et d'un autre plus loin." },
      { text: "Assurez-vous que chaque enfant connaît par cœur le numéro d'un parent." },
      { text: "Choisissez une personne de contact hors du foyer, à qui tout le monde donne des nouvelles." },
      { text: "Installez l'application Alertswiss et apprenez ce que signifient les sirènes." },
      { text: "Sachez où couper le gaz et l'eau, et où est la trousse de secours." },
      { text: "Gardez ensemble des copies des documents, un peu d'argent liquide et des médicaments de réserve." },
      { text: "Exercez-vous une fois : qui fait quoi, qui va chercher qui." },
    ],
  },
  "is-this-a-scam": {
    title: "Est-ce une arnaque ? Tout de suite",
    when: "Quelqu'un demande de l'argent, des codes ou un accès, et cela semble urgent.",
    steps: [
      { text: "Stop. Ne payez rien, ne virez rien, ne cliquez sur rien et ne lisez aucun code pour l'instant." },
      { text: "Raccrochez ou fermez le message." },
      { text: "Cherchez vous-même le numéro de l'organisation et appelez-la.", detail: "N'utilisez jamais le numéro, le lien ou l'application que la personne vous a donnés." },
      { text: "Dites à une personne de confiance ce qui se passe." },
      { text: "Si vous avez déjà payé, appelez votre banque maintenant, au numéro inscrit sur votre carte." },
      { text: "Gardez tout : messages, numéros, références de transaction, et portez plainte à la police." },
    ],
  },
  "right-after-an-incident": {
    title: "Juste après qu'il s'est passé quelque chose",
    when: "Vous avez été agressé, menacé, volé ou suivi.",
    steps: [
      { text: "Mettez-vous dans un endroit sûr, avec du monde et de la lumière." },
      { text: "Si quelqu'un est blessé ou en danger, appelez le 144 ou le 117." },
      { text: "Notez ce dont vous vous souvenez tant que c'est frais : heure, lieu, visages, mots, véhicules." },
      { text: "Faites-vous examiner même si vous vous sentez bien.", detail: "Le choc masque les blessures." },
      { text: "Portez plainte à la police, et gardez le numéro du dossier." },
      { text: "Racontez à un proche ce qui s'est passé." },
      { text: "En Suisse, les centres de consultation LAVI aident gratuitement et en toute confidentialité." },
    ],
  },
};

const IT: Translations = {
  "phone-and-accounts": {
    title: "Proteggere telefono e account",
    when: "Non l'hai mai fatto davvero, o hai appena preso un telefono nuovo.",
    steps: [
      { text: "Installa un gestore di password e salvaci la password della tua e-mail.", detail: "Bitwarden, 1Password, o quello integrato nel telefono. Poi cambia la password dell'e-mail con una lunga e casuale." },
      { text: "Aggiungi una passkey o una chiave di sicurezza al tuo account e-mail principale.", detail: "Impostazioni → Sicurezza del tuo provider e-mail. È l'account con cui si reimpostano tutti gli altri." },
      { text: "Togli i numeri e gli indirizzi di recupero che non controlli più." },
      { text: "Attiva l'accesso in due passaggi per banca, archivio cloud e social.", detail: "Un'app di autenticazione o una passkey dove disponibile; l'SMS solo dove non c'è altro." },
      { text: "Chiedi al tuo operatore un PIN per lo spostamento del numero su una nuova SIM." },
      { text: "Imposta un codice del telefono di più di sei cifre.", detail: "E nascondi l'anteprima dei messaggi sulla schermata di blocco." },
      { text: "Controlla che il disco del portatile sia cifrato.", detail: "Mac: FileVault. Windows: crittografia del dispositivo o BitLocker. Linux: LUKS." },
      { text: "Attiva gli aggiornamenti automatici di telefono, portatile e browser." },
      { text: "Scrivi i codici di recupero e conservali insieme al passaporto." },
    ],
  },
  "night-out": {
    title: "Prima di una serata fuori",
    when: "Esci stasera, soprattutto in un posto nuovo.",
    steps: [
      { text: "Carica il telefono, e porta una piccola batteria se farai tardi." },
      { text: "Conosci la strada di casa e l'ultimo tram o treno.", detail: "E tieni pronta un'app di taxi come riserva." },
      { text: "Di' a una persona dove sarai e più o meno quando tornerai a casa." },
      { text: "Indossa scarpe con cui potresti correre." },
      { text: "Appena arrivi, individua due uscite." },
      { text: "Tieni il bicchiere con te; se ha un sapore strano, smetti e dillo a qualcuno." },
      { text: "Accordatevi tra amici che nessuno se ne va da solo senza dirlo." },
    ],
  },
  "party-or-festival": {
    title: "Prima di una festa o di un festival",
    when: "Una lunga notte con alcol o altre droghe intorno, tue o dei tuoi amici.",
    steps: [
      { text: "Se prenderai qualcosa, fallo analizzare prima.", detail: "Il drug checking di Saferparty a Zurigo è gratuito e anonimo, su appuntamento." },
      { text: "Decidi adesso il tuo limite e l'ora in cui smetti, da sobrio." },
      { text: "Fai un pasto vero prima di uscire." },
      { text: "Accordatevi tra amici di restare insieme e di dirvi cosa avete preso." },
      { text: "Pianifica il ritorno, e chi non guida." },
      { text: "Salva il 144 (ambulanza) e il 145 (Tox Info) nel telefono." },
      { text: "Impara la posizione laterale di sicurezza prima di averne bisogno." },
    ],
  },
  "long-drive": {
    title: "Prima di un lungo viaggio in auto",
    when: "Qualche ora di strada, un passo di montagna, o un viaggio di notte.",
    steps: [
      { text: "Imposta il percorso e la musica prima di partire." },
      { text: "Metti il telefono fuori portata, o su «non disturbare» mentre guidi." },
      { text: "Niente alcol prima di guidare.", detail: "I neopatentati e gli autisti professionisti non possono guidare sotto il suo effetto, per niente." },
      { text: "Prevedi una pausa ogni paio d'ore, e fermati prima se sei stanco." },
      { text: "Controlla che in auto ci siano il triangolo, un gilet ad alta visibilità e la cassetta di pronto soccorso." },
      { text: "Controlla il meteo e le condizioni dei passi sul percorso." },
      { text: "Di' a qualcuno quando pensi di arrivare." },
    ],
  },
  "before-a-swim": {
    title: "Prima di nuotare in un lago o in un fiume",
    when: "Una nuotata, una discesa sul fiume o un pomeriggio al lago.",
    steps: [
      { text: "Niente alcol né droghe prima di entrare in acqua." },
      { text: "Rinfrescati piano; non tuffarti mai accaldato." },
      { text: "Nel fiume, sappi dove uscirai, e l'uscita successiva." },
      { text: "Non tuffarti in acqua di cui non vedi il fondo." },
      { text: "Vai con qualcuno, o avvisa qualcuno sulla riva." },
      { text: "I bambini sempre a portata di mano." },
      { text: "Più l'acqua è fredda, più la nuotata è breve." },
    ],
  },
  "protest-near-my-shop": {
    title: "Una manifestazione passa davanti al mio negozio",
    when: "È annunciata una manifestazione nella tua via o nelle vicinanze.",
    steps: [
      { text: "Leggi il comunicato della polizia cittadina: il percorso, l'ora, le vie chiuse." },
      { text: "Decidi adesso l'ora di chiusura, prima del giorno, e dillo al personale." },
      { text: "Togli contanti, oggetti di valore e la merce più costosa dalla vetrina e dal negozio." },
      { text: "Fotografa il negozio e la merce per l'assicurazione." },
      { text: "Controlla che la tua assicurazione copra i danni da disordini, e cosa ti chiede." },
      { text: "Accordati con i negozi vicini su chi chiama il 117 e su come vi raggiungete." },
      { text: "Prevedi tapparelle, pellicola di sicurezza o pannelli se la tua vetrina è esposta.", detail: "Un artigiano ha bisogno di preavviso; è il passo da avviare per primo." },
      { text: "Se vuoi persone con te mentre chiudi, richiedi dei Protector per tempo.", detail: "Proteggono te e il tuo personale e chiamano il 117; non affrontano una folla." },
      { text: "Il giorno stesso: chiudi in orario, uscite insieme, e non tornare a difendere la merce." },
    ],
  },
  "before-you-travel": {
    title: "Prima di viaggiare",
    when: "Un viaggio all'estero, soprattutto in un posto che non conosci.",
    steps: [
      { text: "Leggi i consigli di viaggio del DFAE per il paese." },
      { text: "Registra il viaggio nell'app Travel Admin." },
      { text: "Verifica vaccinazioni e consigli sanitari per la destinazione." },
      { text: "Salva nel telefono il numero di emergenza locale e quello della tua ambasciata." },
      { text: "Fotografa il passaporto e tieni una copia offline." },
      { text: "Chiedi a chi ti ospita o all'hotel quali zone la gente del posto evita, e quando." },
      { text: "Informati sulle truffe ai turisti più comuni lì." },
      { text: "Lascia il tuo itinerario a qualcuno a casa." },
    ],
  },
  "family-emergency-plan": {
    title: "Il vostro piano di emergenza familiare",
    when: "Una volta all'anno, o ogni volta che la famiglia cambia.",
    steps: [
      { text: "Concordate un punto di ritrovo vicino a casa e uno più lontano." },
      { text: "Assicuratevi che ogni bambino sappia a memoria il numero di un genitore." },
      { text: "Scegliete una persona di contatto fuori casa a cui tutti danno notizie." },
      { text: "Installate l'app Alertswiss e imparate cosa significano le sirene." },
      { text: "Sappiate dove chiudere gas e acqua, e dov'è la cassetta di pronto soccorso." },
      { text: "Tenete insieme copie dei documenti, un po' di contanti e medicinali di scorta." },
      { text: "Esercitatevi una volta: chi fa cosa, chi va a prendere chi." },
    ],
  },
  "is-this-a-scam": {
    title: "È una truffa? Adesso",
    when: "Qualcuno chiede soldi, codici o un accesso, e sembra urgente.",
    steps: [
      { text: "Fermati. Non pagare, non trasferire, non cliccare e non leggere ancora nessun codice." },
      { text: "Riaggancia o chiudi il messaggio." },
      { text: "Cerca tu il numero dell'organizzazione e chiamala.", detail: "Mai usare il numero, il link o l'app che ti ha dato chi ti ha contattato." },
      { text: "Racconta a una persona di fiducia cosa sta succedendo." },
      { text: "Se hai già pagato, chiama subito la tua banca, al numero sulla tua carta." },
      { text: "Conserva tutto: messaggi, numeri, riferimenti delle transazioni, e sporgi denuncia alla polizia." },
    ],
  },
  "right-after-an-incident": {
    title: "Subito dopo che è successo qualcosa",
    when: "Sei stato aggredito, minacciato, derubato o seguito.",
    steps: [
      { text: "Vai in un posto sicuro, con persone e luce." },
      { text: "Se qualcuno è ferito o in pericolo, chiama il 144 o il 117." },
      { text: "Scrivi ciò che ricordi finché è fresco: ora, luogo, volti, parole, veicoli." },
      { text: "Fatti visitare anche se ti senti bene.", detail: "Lo shock nasconde le ferite." },
      { text: "Sporgi denuncia alla polizia, e conserva il numero del caso." },
      { text: "Racconta a una persona vicina cosa è successo." },
      { text: "In Svizzera, i consultori per l'aiuto alle vittime (LAV) aiutano gratuitamente e in modo confidenziale." },
    ],
  },
};

const BY_LOCALE: Partial<Record<Locale, Translations>> = { de: DE, fr: FR, it: IT };

/** A checklist's words in `locale`; English straight from checklists.ts. */
export function checklistWords(c: Checklist, locale: Locale): ChecklistWords {
  return BY_LOCALE[locale]?.[c.slug as Slug] ?? { title: c.title, when: c.when, steps: c.steps };
}

/** For the test: every translation, by language. */
export const CHECKLIST_TRANSLATIONS = BY_LOCALE;
