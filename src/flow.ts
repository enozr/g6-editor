/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-06-27 06:08:14
 * @modify date 2018-06-27 06:08:14
 * @desc [description]
*/

// /* eslint-disable */
// declare module "@antv/g6";
const G6 = require('@antv/g6')

import GenNode from './genFlowNode';
// import BaseDom from './dom';
// import { mixin } from './util';

interface Drag {
  clientX: number;
  clientY: number;
}

class Flow extends G6.Graph {
  // private moduleName: string;
  private nodeMange: GenNode;
  private dragOrigin: Drag;
  private containers: any;
  private event: any;
  constructor(cfg: any) {
    const { graph } = cfg;
    // super(Object.assign({}, graph, { plugins: [grid] }));
    super(graph);
    // this.moduleName = 'Flow';
    this.nodeMange = new GenNode({});
    this.dragOrigin = null;
    // mixin(this, BaseDom);
  }

  addEventListener() {
    const { containers } = this;
    containers.addEventListener('dragover', (ev: any) => { ev.preventDefault(); }, false);
    containers.addEventListener('drop', this.onDrop.bind(this), false);
    this.event.addListener('Itempannel@@dragitem', (ev: any) => {
      const { clientX, clientY } = ev;
      this.dragOrigin = { clientX, clientY };
    });
  }

  addEventTo(event: any) {
    this.event = event;
  }

  dragNode() {
    let node: any;
    let dx: number;
    let dy: number;
    this.on('node:dragstart', (ev: any) => {
      const { item } = ev;
      const model = item.getModel();
      node = item;
      dx = model.x - ev.x;
      dy = model.y - ev.y;
    });
    this.on('node:drag', (ev: any) => {
      this.update(node, {
        x: ev.x + dx,
        y: ev.y + dy,
      });
    });
    this.on('node:dragend', (ev: any) => {
      node = undefined;
    });
  }

  dragGraph() {
    let lastPoint: any;
    // this.on('dragstart', (ev: any) => {
    // });
    this.on('drag', (ev: any) => {
      if (!ev.item) {
        if (lastPoint) {
          this.translate(ev.domX - lastPoint.x, ev.domY - lastPoint.y);
        }
        lastPoint = {
          x: ev.domX,
          y: ev.domY,
        };
      }
    });
    this.on('dragend', (ev: any) => {// eslint-disable-line
      lastPoint = undefined;
    });
  }

  on (type: string, func: any) {
    super.on(type, func)
  }

  onDrag() {
    this.dragNode();
    this.dragGraph();
  }

  onDrop(ev: any) {// eslint-disable-line
    ev.preventDefault();
    const clientX = ev.clientX;
    const clientY = ev.clientY;
    const shape = ev.dataTransfer.getData('shape');
    const extendId = ev.dataTransfer.getData('extendId');
    this.nodeMange.extendModelCard(shape,
      { dragOrigin: this.dragOrigin, dragTarget: { clientX, clientY }, width: 184, height: 40 },
    extendId);
    this.read(this.nodeMange.getData());
  }

  findDom() {
    const { container } = this._cfg;
    this.containers = this.findDomById(container, null);
    this.addEventListener();
  }

  parse() {
    this.findDom();
  }

  findDomById(container: string, node: any) { //eslint-disable-line
    if (node) {
      return node.getElementById(container);
    }
    return document.getElementById(container);
  }

  findDomByClassName(container: string, node: any) {//eslint-disable-line
    if (node) {
      return node.getElementsByClassName(container);
    }
    return document.getElementsByClassName(container);
  }

  read(data: any) {
    // this.nodeMange.setData(data);
    super.read(data);
    setTimeout(() => {
      this.onDrag();
    }, 50);
  }
  //  动态注册事件，由toolbar配置启动。
  // registerEvent() {

  // }

  update(type: string, func: any) {
    super.update(type, func);
  }

  translate(x: number, y: number) {
    super.translate(x, y);
  }
}


Flow.registerNode = G6.registerNode;
Flow.registerEdge = G6.registerEdge;
Flow.registerGroup = G6.registerGroup;
Flow.registerGuide = G6.registerGuide;
Flow.registerBehaviour = G6.registerBehaviour;
Flow.version = '0.1.0';

export default Flow;