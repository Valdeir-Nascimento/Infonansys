import { Component, Input, OnInit } from '@angular/core';

interface BreadCrumbItem {
    text: string;
    link?: string
}

@Component({
    selector: 'app-bread-crumb',
    templateUrl: './bread-crumb.component.html',
    styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

    @Input() items: BreadCrumbItem[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    obterUltimoItem(item: BreadCrumbItem): boolean {
        const index = this.items.indexOf(item);
        return index + 1 == this.items.length;
    }
}
