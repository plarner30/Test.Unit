import { wait } from "./utils";

export class Button{
  button : HTMLElement;
  constructor(button : HTMLElement){
    this.button = button;
  }

  async click(){
    this.button.click();
    await wait();
  }
}
