class App {
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographers_section')
        this.photographerApi = new PhotographerApi('/data/photographers.json')
    }

    async main() {
        const photographers = await this.photographerApi.getPhotographers()

        photographers.forEach(photographer => {
            const Template = new PhotographerCard(photographer)
            this.$photographersWrapper.appendChild(Template.createPhotographerCard())        
        })    
    }
}

const app = new App()
app.main()