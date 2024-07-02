document.addEventListener('DOMContentLoaded', function() {
    var currentSlide = 0;
    var amount = document.querySelectorAll('.images');
    var image = document.getElementById('currentSlide');
    var back = document.getElementById('back');
    var next = document.getElementById('next');
    var moveUp = document.querySelector('.moveUp');
    var pass = document.querySelectorAll('.selection div');
    var roll = true;
    let lastScrollTop = 0;
    header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            if (scrollTop > lastScrollTop) {
                header.style.top="-100px";
            } else {
                header.style.top="0";
            }
        } else {
            header.style.top="0";
        }

        lastScrollTop = scrollTop;
    });

    for (let i = 0; i < pass.length; i++) {
        pass[i].addEventListener('click', function() {
            currentSlide = pass[i].id;
            roll = false;
            slide();
        });
    }

    back.addEventListener('click', function() {
        currentSlide--;
        roll = false;
        slide();
    });

    next.addEventListener('click', function() {
        currentSlide++;
        roll = false;
        slide();
    });

    function slide() {
        if (currentSlide >= amount.length) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = amount.length - 1;
        }
        document.querySelector('.currentSelection').classList.remove('currentSelection');
        image.style.marginLeft = -25 * currentSlide + '%';
        document.getElementById(currentSlide).classList.add('currentSelection');
    }

    slide();

    setInterval(function() {
        if (roll) {
            currentSlide++;
            slide();
        } else {
            roll = true;
        }
    }, 7500);

    moveUp.addEventListener('click', function() {
        window.scrollTo(top)
    })

    const productContainer = document.querySelector('.product-container');

    function createProductBox(imageNumber) {
        const productBox = document.createElement('div');
        productBox.className = 'productBox';

        const img = document.createElement('img');
        img.src = `img/${imageNumber}.webp`;
        img.alt = `Product Image ${imageNumber}`;
        
        const p1 = document.createElement('p');
        p1.textContent = `Sneaker ${imageNumber}`;

        const p2 = document.createElement('p');
        p2.textContent = `$ ${(Math.random() * (300 - 50) + 50).toFixed(2)}`;

        const icon = document.createElement('i');
        icon.className = 'fa-regular fa-star';

        productBox.appendChild(img);
        productBox.appendChild(p1);
        productBox.appendChild(p2);
        productBox.appendChild(icon);

        return productBox;
    }

    for (let i = 1; i <= 14; i++) {
        const productBox = createProductBox(i);
        productContainer.appendChild(productBox);
    }
});