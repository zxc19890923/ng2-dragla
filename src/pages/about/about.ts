import { Component } from "@angular/core";
import { DragulaService } from "ng2-dragula";

import { Subscription } from "rxjs";
@Component({
  selector: "page-about",
  templateUrl: "./about.html"
})
export class AboutPage {
  subs = new Subscription();
  BAG = "HANDLES";
  public constructor(private dragulaService: DragulaService) {
    dragulaService.createGroup("HANDLES", {
      moves: (el, container, handle) => {
        return handle.className === "handle";
      }
    });
    this.subs.add(
      // 拖动
      dragulaService.drag(this.BAG).subscribe(({ el }) => {
        // this.removeClass(el, "ex-moved");
        console.log(el);
      })
    );
    this.subs.add(
      // 放开
      dragulaService.drop(this.BAG).subscribe(({ el }) => {
        // this.addClass(el, "ex-moved");
      })
    );
    this.subs.add(
      // 经过
      dragulaService.over(this.BAG).subscribe(({ el, container }) => {
        console.log("over", container);
        // this.addClass(container, "ex-over");
      })
    );
    this.subs.add(
      // 拖出
      dragulaService.out(this.BAG).subscribe(({ el, container }) => {
        console.log("out", container);
        // this.removeClass(container, "ex-over");
      })
    );
  }

  // 销毁拖动事件
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  // 定义方法
  private hasClass(el: Element, name: string): any {
    return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(el.className);
  }
  private addClass(el: Element, name: string): void {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(" ") : name;
    }
  }
  private removeClass(el: Element, name: string): void {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(
        new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"),
        ""
      );
    }
  }
}
