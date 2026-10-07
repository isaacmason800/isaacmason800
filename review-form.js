/* ========================================
   CHEAP CHAPS CASK
   REVIEW GENERATOR
   ======================================== */

let imageData = "";


/* ========================================
   GET FORM DATA
   ======================================== */

function getFormData() {

    return {
        beerName: document.getElementById("beerName").value.trim(),
        reviewer: document.getElementById("reviewer").value.trim(),
        introduction: document.getElementById("introduction").value.trim(),
        reviewText: document.getElementById("reviewText").value.trim(),

        taste: document.getElementById("taste").value,
        tastingNotes: document.getElementById("tastingNotes").value.trim(),
        presentation: document.getElementById("presentation").value.trim(),
        deliveryMethod: document.getElementById("deliveryMethod").value.trim(),

        purchaseLocation:
            document.getElementById("purchaseLocation").value.trim(),

        locationScore:
            document.getElementById("locationScore").value,

        price:
            document.getElementById("price").value,

        overallScore:
            document.getElementById("overallScore").value
    };
}


/* ========================================
   ESCAPE HTML
   ======================================== */

function escapeHTML(text) {

    return String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ========================================
   IMAGE UPLOAD
   ======================================== */

document.getElementById("beerImage").addEventListener(
    "change",
    function(event) {

        const file = event.target.files[0];

        if (!file) {
            imageData = "";
            return;
        }

        if (!file.type.startsWith("image/")) {

            alert("Please select an image file.");

            return;
        }


        const reader = new FileReader();


        reader.onload = function(e) {

            const image = new Image();


            image.onload = function() {

                const maxWidth = 1600;

                let width = image.width;
                let height = image.height;


                if (width > maxWidth) {

                    height =
                        height * (maxWidth / width);

                    width = maxWidth;
                }


                const canvas =
                    document.createElement("canvas");


                canvas.width = width;
                canvas.height = height;


                const context =
                    canvas.getContext("2d");


                context.drawImage(
                    image,
                    0,
                    0,
                    width,
                    height
                );


                imageData =
                    canvas.toDataURL(
                        "image/jpeg",
                        0.8
                    );


                const preview =
                    document.getElementById(
                        "imagePreview"
                    );


                preview.src = imageData;

                preview.style.display = "block";


                const message =
                    document.querySelector(
                        "#imagePreviewContainer p"
                    );


                if (message) {
                    message.textContent =
                        "Image selected:";
                }

            };


            image.src = e.target.result;

        };


        reader.readAsDataURL(file);

    }
);


/* ========================================
   CREATE REVIEW
   ======================================== */

function createReview(data) {

    let imageHTML = "";


    if (imageData) {

        imageHTML = `
            <div class="beer-image">
                <img
                    src="${imageData}"
                    alt="${escapeHTML(data.beerName)}"
                >
            </div>
        `;
    }


    return `
        <div class="review-container">

            <article class="beer-review">

                <h2>
                    ${escapeHTML(data.beerName)}
                </h2>

                <h3>
                    ${escapeHTML(data.reviewer)}
                </h3>

                <p>
                    ${escapeHTML(data.introduction)}
                </p>

                ${imageHTML}

                <p>
                    ${escapeHTML(data.reviewText)}
                </p>

            </article>


            <aside class="score-card">

                <h2>
                    Cheap Chaps Cask<br>
                    Score Card
                </h2>


                <div class="score-item">

                    <h3>Taste</h3>

                    <p class="score">
                        ${escapeHTML(data.taste)}/10
                    </p>

                </div>


                <div class="score-item">

                    <h3>Tasting Notes</h3>

                    <p>
                        ${escapeHTML(data.tastingNotes)}
                    </p>

                </div>


                <div class="score-item">

                    <h3>Presentation</h3>

                    <p>
                        ${escapeHTML(data.presentation)}
                    </p>

                </div>


                <div class="score-item">

                    <h3>Delivery Method</h3>

                    <p>
                        ${escapeHTML(data.deliveryMethod)}
                    </p>

                </div>


                <div class="score-item">

                    <h3>Purchase Location</h3>

                    <p>
                        ${escapeHTML(data.purchaseLocation)}
                    </p>

                    <p>
                        Location Score:
                        <strong>
                            ${escapeHTML(data.locationScore)}/10
                        </strong>
                    </p>

                </div>


                <div class="score-item">

                    <h3>Price Per Pint</h3>

                    <p class="price">
                        £${escapeHTML(data.price)}
                    </p>

                </div>


                <div class="overall-score">

                    <p class="overall-label">
                        CHEAP CHAPS CASK SCORE
                    </p>

                    <p class="overall-number">
                        ${escapeHTML(data.overallScore)}
                    </p>

                    <p class="overall-out-of">
                        OUT OF 10
                    </p>

                </div>

            </aside>

        </div>
    `;
}


/* ========================================
   PREVIEW BUTTON
   ======================================== */

document
    .getElementById("previewButton")
    .addEventListener("click", function() {

        const data = getFormData();


        if (!data.beerName) {

            alert("Please enter a beer name.");

            return;
        }


        document.getElementById(
            "reviewPreview"
        ).innerHTML = createReview(data);


        document.getElementById(
            "reviewPreviewSection"
        ).scrollIntoView({
            behavior: "smooth"
        });

    });


/* ========================================
   GENERATE REVIEW BUTTON
   ======================================== */

document
    .getElementById("generateButton")
    .addEventListener("click", function() {

        const data = getFormData();


        /* Check required information */

        if (!data.beerName) {

            alert("Please enter the beer name.");

            return;
        }


        if (!data.reviewer) {

            alert("Please enter the reviewer name.");

            return;
        }


        /*
         * Build the complete HTML document.
         */

        const imageHTML = imageData

            ? `
                <div class="beer-image">

                    <img
                        src="${imageData}"
                        alt="${escapeHTML(data.beerName)}"
                    >

                </div>
            `

            : "";


        const generatedHTML = `<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>${escapeHTML(data.beerName)} - Cheap Chaps Cask</title>

    <link rel="stylesheet" href="../default.css">

    <style>

        .review-container {

            display: grid;

            grid-template-columns:
                minmax(0, 1fr) 330px;

            gap: 40px;

            max-width: 1200px;

            margin: 40px auto;

            padding: 0 20px;

        }


        .beer-review {

            min-width: 0;

        }


        .beer-review h2 {

            font-size: 2.5rem;

            margin-bottom: 5px;

        }


        .beer-review h3 {

            margin-top: 0;

        }


        .beer-image {

            width: 100%;

            max-width: 700px;

            margin: 25px 0;

        }


        .beer-image img {

            display: block;

            width: 100%;

            height: auto;

            border-radius: 10px;

            border: 2px solid #333;

        }


        .score-card {

            width: 330px;

            padding: 25px;

            box-sizing: border-box;

            border: 2px solid #333;

            border-radius: 10px;

            background-color: #f5f1e8;

        }


        .score-card > h2 {

            text-align: center;

            margin-top: 0;

            margin-bottom: 10px;

            padding-bottom: 15px;

            border-bottom: 2px solid #333;

        }


        .score-item {

            padding: 12px 0;

            border-bottom: 1px solid #bbb;

        }


        .score-item h3 {

            margin: 0 0 6px 0;

            font-size: 1rem;

        }


        .score-item p {

            margin: 4px 0;

            line-height: 1.4;

        }


        .score {

            font-size: 1.3rem;

            font-weight: bold;

        }


        .price {

            font-size: 1.3rem;

            font-weight: bold;

        }


        .overall-score {

            margin-top: 25px;

            padding: 20px 15px;

            text-align: center;

            border: 3px solid #333;

            border-radius: 10px;

            background-color: #e8dfc9;

        }


        .overall-label {

            margin: 0;

            font-size: 0.85rem;

            font-weight: bold;

            letter-spacing: 2px;

        }


        .overall-number {

            margin: 5px 0 0 0;

            font-size: 4rem;

            line-height: 1;

            font-weight: bold;

        }


        .overall-out-of {

            margin: 5px 0 0 0;

            font-size: 0.9rem;

            font-weight: bold;

            letter-spacing: 2px;

        }


        @media (max-width: 800px) {

            .review-container {

                grid-template-columns: 1fr;

            }


            .score-card {

                width: 100%;

            }

        }

    </style>

</head>


<body>


<header class="top-banner">


    <div class="site-title">

        <h1>
            Cheap Chaps Cask
        </h1>

    </div>


    <nav class="navigation">

        <a href="../index.html">
            Home
        </a>

        <a href="#">
            Beers
        </a>

        <a href="#">
            Taverns
        </a>

        <a href="../InMemoriam.html">
            More
        </a>

        <a href="#">
            Contact
        </a>

    </nav>


    <div class="site-logo">

        <img
            src="../ccclogo.png"
            alt="Cheap Chaps Cask logo"
        >

    </div>


</header>


<main class="review-container">


    <article class="beer-review">


        <h2>
            ${escapeHTML(data.beerName)}
        </h2>


        <h3>
            ${escapeHTML(data.reviewer)}
        </h3>


        <p>
            ${escapeHTML(data.introduction)}
        </p>


        ${imageHTML}


        <p>
            ${escapeHTML(data.reviewText)}
        </p>


    </article>


    <aside class="score-card">


        <h2>
            Cheap Chaps Cask<br>
            Score Card
        </h2>


        <div class="score-item">

            <h3>Taste</h3>

            <p class="score">
                ${escapeHTML(data.taste)}/10
            </p>

        </div>


        <div class="score-item">

            <h3>Tasting Notes</h3>

            <p>
                ${escapeHTML(data.tastingNotes)}
            </p>

        </div>


        <div class="score-item">

            <h3>Presentation</h3>

            <p>
                ${escapeHTML(data.presentation)}
            </p>

        </div>


        <div class="score-item">

            <h3>Delivery Method</h3>

            <p>
                ${escapeHTML(data.deliveryMethod)}
            </p>

        </div>


        <div class="score-item">

            <h3>Purchase Location</h3>

            <p>
                ${escapeHTML(data.purchaseLocation)}
            </p>

            <p>
                Location Score:
                <strong>
                    ${escapeHTML(data.locationScore)}/10
                </strong>
            </p>

        </div>


        <div class="score-item">

            <h3>Price Per Pint</h3>

            <p class="price">
                £${escapeHTML(data.price)}
            </p>

        </div>


        <div class="overall-score">

            <p class="overall-label">
                CHEAP CHAPS CASK SCORE
            </p>

            <p class="overall-number">
                ${escapeHTML(data.overallScore)}
            </p>

            <p class="overall-out-of">
                OUT OF 10
            </p>

        </div>


    </aside>


</main>


<footer>

    <p>
        &copy; 2026 Cheap Chaps Cask
    </p>

</footer>


</body>

</html>`;


        /*
         * Create downloadable file.
         */

        const blob = new Blob(
            [generatedHTML],
            {
                type: "text/html;charset=utf-8"
            }
        );


        const url =
            window.URL.createObjectURL(blob);


        /*
         * Create download link.
         */

        const downloadLink =
            document.createElement("a");


        downloadLink.href = url;


        let filename =
            data.beerName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");


        if (!filename) {
            filename = "beer-review";
        }


        downloadLink.download =
            filename + ".html";


        /*
         * Add link to page,
         * click it,
         * then remove it.
         */

        document.body.appendChild(downloadLink);

        downloadLink.click();

        document.body.removeChild(downloadLink);


        /*
         * Clean up temporary URL.
         */

        setTimeout(function() {

            window.URL.revokeObjectURL(url);

        }, 1000);


        alert(
            "Review generated successfully.\n\n" +
            "The HTML file should now be in your Downloads folder."
        );

    });