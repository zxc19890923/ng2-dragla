import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { DragulaService } from "ng2-dragula";
@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [DragulaService]
})
export class HomePage {
  vampires: any;
  constructor(
    public navCtrl: NavController,
    public dragulaService: DragulaService
  ) {
    this.vampires = [
      {
        name: "zxc",
        value: 30
      },
      {
        name: "lzy",
        value: 5
      },
      {
        name: "cbr",
        value: 3
      },
      {
        name: "hp",
        value: 7
      }
    ];

    // 创建拖拽 （name, options）
    dragulaService.createGroup("拖拽", {
      moves: (el, container, handle) => {
        console.log(el, container, handle);
        return handle.className === "handle";
      }
    });
  }
  // 拖动返回的是所有列表重新排序后的数组
  dragFun(event) {
    console.log(event);
  }
}
