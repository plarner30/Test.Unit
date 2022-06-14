import { wait } from "./utils";

export class Checkbox{
  input : HTMLInputElement;
  label : HTMLElement;
  constructor(element : HTMLElement){
    this.input = element.querySelector('input');
    this.label = element.querySelector('label');
  }

  get isSelected() : boolean{
    return this.input.checked;
  }

  async click(){
    window.getComputedStyle(this.label, null).pointerEvents !== "none" && this.label.click();
    await wait();
  }

  get text(){
    return this.label.innerText.trim();
  }
}
