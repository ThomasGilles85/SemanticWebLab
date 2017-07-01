export class collapsedContent {

    public isCollapsedContent;

   
    constructor() {
        if(window.screen.width < 500)
        {
             this.isCollapsedContent = true;   
        }
        else
        {
             this.isCollapsedContent = false;   
        }
    }

    
}