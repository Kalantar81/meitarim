import { Component, OnInit } from '@angular/core';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTreeNestedDataSource } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import * as observable from 'rxjs';

@Component({
  selector: 'app-simple-tree',
  templateUrl: './simple-tree.component.html',
  styleUrls: ['./simple-tree.component.css']
})
export class SimpleTreeComponent {

  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;

  dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);

  constructor() {
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);

    this.dataChange.subscribe(
      data => {
        this.nestedDataSource.data = data;
      }
    );

    this.dataChange.next([
      {
        filename: 'folder',
        type: '',
        children: [
          {
            filename: 'text2',
            type: 'exe',
            children: []
          },
          {
            filename: 'text3',
            type: 'exe',
            children: []
          }
        ]
      }
    ]);
  }

private _getChildren = (node: FileNode) =>  {return observable.of(node.children)}
hasNestedChild = (_: number, nodeData: FileNode) => {return !(nodeData.type);};
}

export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}


/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

