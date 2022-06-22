function Slider() {

    this.imagesUrls = [];
    this.back = null;
    this.next = null;
    this.img_sliders = null;
    this.count = 0;
    this.lenghtImagesUrls = 0;

    this.start = function (elId) {
        const elSelector = '#' + elId;
        const el = document.querySelector(elSelector);

        this.back = el.querySelector('#back');
        this.next = el.querySelector('#next');
        this.img_sliders = el.querySelector('#img_slider');

        this.back.addEventListener('click', (e) => {
            this.showPrevImg(e);
        });
        this.next.addEventListener('click', (e) => {
            this.showNextImg(e);
        });

        this.imagesUrls.push('https://avatars.mds.yandex.net/get-zen_doc/5221947/pub_6117bb937e37175eb6409d6b_6117bc4e6eab3f04dedc5031/scale_1200')
        this.imagesUrls.push('https://i.pinimg.com/736x/a6/d5/20/a6d52082c876e3bd9a4f33e1f8adc267.jpg')
        this.imagesUrls.push('https://c.pxhere.com/photos/e4/b6/chihuahua_dog_small_dog_pet_small_animal_portrait_young_dog_animal-566011.jpg!d')
        this.imagesUrls.push('https://s1.1zoom.ru/big0/54/338773-sepik.jpg')
        this.imagesUrls.push('https://kartinkin.net/uploads/posts/2021-07/1625663191_59-kartinkin-com-p-oboi-gori-krasivie-64.jpg')

        this.lenghtImagesUrls = this.imagesUrls.length;
        this.img_sliders.src = this.imagesUrls[this.count];
    }

    this.showPrevImg = function (e) {
        this.count--;
        if (this.count < 0) {
            this.count = this.lenghtImagesUrls - 1;
        }
        this.img_sliders.src = this.imagesUrls[this.count];
    }

    this.timer = setInterval(() => {
        this.showNextImg()
    }, 5000)

    this.showNextImg = function (e) {
        this.count++;
        if (this.count > this.lenghtImagesUrls - 1) {
            this.count = 0;
        }
        this.img_sliders.src = this.imagesUrls[this.count];
    }

}

const sliderFabric = {
    createSlider: function () {
        const newSlider = new Slider();
        return newSlider;
    }
}