import { DOCUMENT } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) { 
    this.renderer = this.rendererFactory.createRenderer(null,null);
  }

  enableLight(){
    this.removeAll();
    this.renderer.addClass(this.document.body, 'default-theme');
  }

  enableDark(){
    this.removeAll();
    this.renderer.addClass(this.document.body, 'dark-theme');
  } 

  enableTurtleHermit(){
    this.removeAll();
    this.renderer.addClass(this.document.body, 'turtleHermit-theme');
  }

  enableNamekian(){
    this.removeAll();
    this.renderer.addClass(this.document.body, 'namekian-theme');
  }

  enableBuu(){
    this.removeAll();
    this.renderer.addClass(this.document.body, 'buu-theme');
  }

  removeAll(){
    this.renderer.removeClass(this.document.body, 'dark-theme');
    this.renderer.removeClass(this.document.body, 'turtleHermit-theme');
    this.renderer.removeClass(this.document.body, 'namekian-theme');
    this.renderer.removeClass(this.document.body, 'buu-theme');
  }


}
