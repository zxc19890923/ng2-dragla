import { Component, ViewChildren, QueryList, ElementRef } from "@angular/core";
import { DragulaService } from "ng2-dragula";

import { Subscription } from "rxjs";
@Component({
  selector: "page-about",
  templateUrl: "./about.html"
})
export class AboutPage {
  // @ViewChildren("values") childList: QueryList<ElementRef>  如果这样后面处理的时候，可能会遇到类型错误，定义为any容错性比较高
  @ViewChildren("values")
  childList: any;
  subs = new Subscription();
  BAG = "HANDLES";
  public constructor(private dragulaService: DragulaService) {
    dragulaService.createGroup("HANDLES", {
      moves: (el, container, handle) => {
        return handle.className === "handle";
      }
    });
    // window.addEventListener("touchmove", () => {
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
      // 拖出 el拖动的元素，container整个列表
      dragulaService.out(this.BAG).subscribe(({ el, container }) => {
        console.log("out", el, container);
        let ss: any = container;
        var arr = [];
        // this.removeClass(container, "ex-over");
        for (var i = 0; i < ss.children.length; i++) {
          arr.push(ss.children[i].children[0].innerText);
        }
        // 返回排序后的id数组
        console.log(arr);
      })
    );
    // });
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

