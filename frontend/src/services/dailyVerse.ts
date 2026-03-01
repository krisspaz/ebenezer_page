// Service for fetching daily Bible verses
// Uses a curated local database for reliability (no external API dependencies)

interface BibleVerse {
    reference: string;
    text: string;
    translation: string;
}

// Curated list of inspiring verses with full text (RVR1960 Spanish)
const INSPIRING_VERSES = [
    {
        reference: "Juan 3:16",
        text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."
    },
    {
        reference: "Filipenses 4:13",
        text: "Todo lo puedo en Cristo que me fortalece."
    },
    {
        reference: "Jeremías 29:11",
        text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis."
    },
    {
        reference: "Salmos 23:1",
        text: "Jehová es mi pastor; nada me faltará."
    },
    {
        reference: "Proverbios 3:5-6",
        text: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas."
    },
    {
        reference: "Romanos 8:28",
        text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados."
    },
    {
        reference: "Isaías 41:10",
        text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia."
    },
    {
        reference: "Mateo 11:28",
        text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar."
    },
    {
        reference: "2 Corintios 5:7",
        text: "Porque por fe andamos, no por vista."
    },
    {
        reference: "Salmos 46:1",
        text: "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones."
    },
    {
        reference: "Josué 1:9",
        text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas."
    },
    {
        reference: "Salmos 37:4",
        text: "Deléitate asimismo en Jehová, y él te concederá las peticiones de tu corazón."
    },
    {
        reference: "Romanos 12:2",
        text: "No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta."
    },
    {
        reference: "Efesios 2:8",
        text: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios."
    },
    {
        reference: "1 Juan 4:19",
        text: "Nosotros le amamos a él, porque él nos amó primero."
    },
    {
        reference: "Mateo 6:33",
        text: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas."
    },
    {
        reference: "Salmos 91:1-2",
        text: "El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente. Diré yo a Jehová: Esperanza mía, y castillo mío; mi Dios, en quien confiaré."
    },
    {
        reference: "Isaías 40:31",
        text: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán."
    },
    {
        reference: "Proverbios 16:3",
        text: "Encomienda a Jehová tus obras, y tus pensamientos serán afirmados."
    },
    {
        reference: "Filipenses 4:6-7",
        text: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús."
    },
    {
        reference: "Salmos 118:24",
        text: "Este es el día que hizo Jehová; nos gozaremos y alegraremos en él."
    },
    {
        reference: "Juan 14:6",
        text: "Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí."
    },
    {
        reference: "Romanos 8:38-39",
        text: "Por lo cual estoy seguro de que ni la muerte, ni la vida, ni ángeles, ni principados, ni potestades, ni lo presente, ni lo por venir, ni lo alto, ni lo profundo, ni ninguna otra cosa creada nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro."
    },
    {
        reference: "Salmos 27:1",
        text: "Jehová es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?"
    },
    {
        reference: "Jeremías 33:3",
        text: "Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces."
    },
    {
        reference: "1 Pedro 5:7",
        text: "Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros."
    },
    {
        reference: "Salmos 119:105",
        text: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino."
    },
    {
        reference: "Mateo 5:14",
        text: "Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder."
    },
    {
        reference: "Colosenses 3:23",
        text: "Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres."
    },
    {
        reference: "Hebreos 11:1",
        text: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve."
    },
];

/**
 * Get the daily verse index based on the current date
 * Rotates through the verse list daily
 */
function getDailyVerseIndex(): number {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    return dayOfYear % INSPIRING_VERSES.length;
}

/**
 * Get daily verse - Uses local curated database
 * This ensures reliable, instant performance without external API dependencies
 */
export async function fetchDailyVerse(): Promise<BibleVerse> {
    const verseIndex = getDailyVerseIndex();
    const verse = INSPIRING_VERSES[verseIndex];

    return {
        reference: verse.reference,
        text: verse.text,
        translation: 'RVR1960',
    };
}

/**
 * Get the current verse number and total
 */
export function getVerseProgress(): { current: number; total: number } {
    return {
        current: getDailyVerseIndex() + 1,
        total: INSPIRING_VERSES.length,
    };
}
