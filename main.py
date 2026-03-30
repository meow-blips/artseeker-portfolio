from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(title="Artseeker — Creative Portfolio")
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=BASE_DIR / "templates")

PORTFOLIO_ITEMS = [
    {
        "id": 1,
        "title": "Chibi Rengoku",
        "category": "drawings",
        "image": "/static/images/chibi-rengoku.png",
        "description": "A chibi-style illustration of Kyojuro Rengoku from Demon Slayer, bursting with energy. Flame-patterned haori and fiery golden hair brought to life with vibrant markers and fine line work.",
        "tools": ["Brustro Fineliner 0.2mm", "Alcohol Markers", "Sketchbook"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹2,999",
    },
    {
        "id": 2,
        "title": "Hydrangea in Bloom",
        "category": "drawings",
        "image": "/static/images/hydrangea-flowers.png",
        "description": "A lush cluster of hydrangea flowers in deep blues, purples, and pinks against a rich black background. Each petal is individually rendered to capture the gradient transitions and delicate veining.",
        "tools": ["Colored Pencils", "Black Card Stock", "White Gel Pen"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹5,499",
    },
    {
        "id": 3,
        "title": "Amigurumi Piglet",
        "category": "crochet",
        "image": "/static/images/amigurumi-pig.png",
        "description": "A tiny, squishy amigurumi piglet in baby pink chenille yarn. Embroidered face with little black bead eyes and a button nose — small enough to fit in your palm.",
        "tools": ["4.0mm Hook", "Hobby Store Chenille Yarn", "Embroidery Thread", "Polyfill"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹1,699",
    },
    {
        "id": 4,
        "title": "Amigurumi Bunny",
        "category": "crochet",
        "image": "/static/images/amigurumi-bunny.png",
        "description": "A sweet white bunny with long floppy ears and a pink scarf, crocheted in soft bulky chenille. Standing about 10 inches tall with embroidered pink cheeks and safety eyes.",
        "tools": ["5.0mm Hook", "Hobby Store Chenille Yarn", "Safety Eyes", "Polyfill"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹3,299",
    },
    {
        "id": 5,
        "title": "Blue-Eyed Portrait",
        "category": "drawings",
        "image": "/static/images/anime-portrait-blue-eyes.png",
        "description": "A detailed anime-style portrait featuring messy dark brown hair and striking blue eyes. Rendered in colored pencil with careful attention to skin tones, fabric texture on the brown jacket, and light reflections in the eyes.",
        "tools": ["Prismacolor Colored Pencils", "Sketchbook", "Blending Stumps"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹3,999",
    },
    {
        "id": 6,
        "title": "Zhongli — Genshin Impact",
        "category": "drawings",
        "image": "/static/images/zhongli-sketch.png",
        "description": "A full-body graphite sketch of Zhongli from Genshin Impact, capturing his elegant robes, flowing hair, and Geo energy emanating from his hand. Intricate detail work on the armor patterns and floating stone runes.",
        "tools": ["Graphite Pencils (2H–6B)", "Drawing Paper", "Kneaded Eraser"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹4,499",
    },
    {
        "id": 7,
        "title": "Kaedehara Kazuha",
        "category": "drawings",
        "image": "/static/images/kazuha-fanart.png",
        "description": "A dynamic fan art of Kazuha from Genshin Impact in mid-motion. Bold reds, blacks, and oranges bring his maple-leaf-patterned kimono to life, with flowing white hair and crimson accents.",
        "tools": ["Alcohol Markers", "Fineliner Pens", "Drawing Paper"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹4,499",
    },
    {
        "id": 8,
        "title": "Tropical Toucan",
        "category": "drawings",
        "image": "/static/images/toucan-painting.png",
        "description": "A vibrant gouache painting of a toucan perched on a branch, surrounded by lush tropical monstera leaves. Rich greens fill the background while the toucan's orange beak and blue eye pop with life.",
        "tools": ["Gouache Paint", "Round Brushes", "Watercolor Paper"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹3,799",
    },
    {
        "id": 9,
        "title": "Bunny & Honey Jar",
        "category": "drawings",
        "image": "/static/images/bunny-honey-jar.png",
        "description": "A heartwarming graphite sketch of a lop-eared bunny peeking over a honey jar, surrounded by daisies and wildflowers. Soft shading and cross-hatching give it a storybook charm.",
        "tools": ["Faber-Castell Graphite Pencil", "Sketchbook", "Kneaded Eraser"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹2,999",
    },
    {
        "id": 10,
        "title": "Christmas Cupcake",
        "category": "drawings",
        "image": "/static/images/christmas-cupcake.png",
        "description": "A festive chocolate cupcake topped with whipped cream, berries, chocolate leaves, and a candy cane — drawn in alcohol markers with rich warm tones and delicious detail.",
        "tools": ["TouchCool Alcohol Markers", "Fineliner", "Sketchbook"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹1,999",
    },
    {
        "id": 11,
        "title": "Armored Titan",
        "category": "drawings",
        "image": "/static/images/armored-titan.png",
        "description": "A powerful illustration of the Armored Titan from Attack on Titan, showcasing the intricate muscle and armor plating. Gold, crimson, and blue highlights create a sense of raw power and intensity.",
        "tools": ["Alcohol Markers", "Brustro Fineliner", "Sketchbook"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹4,999",
    },
    {
        "id": 12,
        "title": "Hawks — My Hero Academia",
        "category": "drawings",
        "image": "/static/images/hawks-mha.png",
        "description": "The winged hero Hawks from My Hero Academia, captured mid-flight with his signature crimson wings spread wide. Dynamic pose with detailed feather work and his iconic visor.",
        "tools": ["Alcohol Markers", "Fineliner Pens", "Drawing Paper"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹4,499",
    },
    {
        "id": 13,
        "title": "Shinobu — Butterfly Dance",
        "category": "drawings",
        "image": "/static/images/shinobu-butterflies.png",
        "description": "Shinobu Kocho from Demon Slayer surrounded by golden and pink butterflies against a starry night sky. The iridescent butterfly-wing haori is painted with swirling purple and blue patterns.",
        "tools": ["Alcohol Markers", "White Gel Pen", "Sketchbook"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹4,999",
    },
    {
        "id": 14,
        "title": "Zenitsu — Thunder Breathing",
        "category": "drawings",
        "image": "/static/images/zenitsu-thunder.png",
        "description": "Zenitsu Agatsuma from Demon Slayer unleashing Thunder Breathing First Form. Electric blue lightning crackles around his yellow haori as rocks shatter beneath him.",
        "tools": ["Alcohol Markers", "Brustro Fineliner", "Sketchbook"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹3,999",
    },
    {
        "id": 15,
        "title": "Gothic Castle",
        "category": "drawings",
        "image": "/static/images/castle-ink.png",
        "description": "A detailed ink study of a Gothic castle with multiple spires, arched windows, and intricate stonework. Every brick and turret is carefully rendered with fine pen lines and cross-hatching.",
        "tools": ["Ink Pens", "Fine-tip Liner", "Drawing Paper"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹3,299",
    },
    {
        "id": 16,
        "title": "Songbird on Cherry Blossom",
        "category": "drawings",
        "image": "/static/images/bird-on-branch.png",
        "description": "A delicate graphite drawing of a small songbird perched on a cherry blossom branch. Soft feather textures and gentle shading give this piece a peaceful, naturalistic quality.",
        "tools": ["Graphite Pencils", "Drawing Paper", "Blending Stump"],
        "purchase_link": "https://instagram.com/artseeker13",
        "price": "₹2,499",
    },
]


@app.get("/", response_class=HTMLResponse)
async def about(request: Request):
    return templates.TemplateResponse(request, "about.html", {"title": "About"})


@app.get("/home", response_class=HTMLResponse)
async def home(request: Request):
    featured = PORTFOLIO_ITEMS[:6]
    return templates.TemplateResponse(
        request, "home.html", {"title": "Home", "featured": featured}
    )


@app.get("/gallery", response_class=HTMLResponse)
async def gallery(request: Request):
    return templates.TemplateResponse(request, "gallery.html", {"title": "Gallery"})


@app.get("/contact", response_class=HTMLResponse)
async def contact(request: Request):
    return templates.TemplateResponse(request, "contact.html", {"title": "Contact"})




@app.get("/api/portfolio")
async def api_portfolio(category: str = None):
    if category and category != "all":
        filtered = [i for i in PORTFOLIO_ITEMS if i["category"] == category]
        return JSONResponse(content=filtered)
    return JSONResponse(content=PORTFOLIO_ITEMS)
