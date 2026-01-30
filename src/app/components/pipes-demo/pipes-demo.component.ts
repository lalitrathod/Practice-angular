import { Component, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Custom Pipe - Filter Array
@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    
    searchText = searchText.toLowerCase();
    return items.filter(item => 
      item.toLowerCase().includes(searchText)
    );
  }
}

// Custom Pipe - Truncate Text
@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20, trail: string = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

@Component({
  selector: 'app-pipes-demo',
  standalone: true,
  imports: [CommonModule, FilterPipe, TruncatePipe, FormsModule],
  templateUrl: './pipes-demo.component.html',
  styleUrl: './pipes-demo.component.scss'
})
export class PipesDemoComponent {
  // Built-in pipes examples
  currentDate = new Date();
  price = 99.99;
  percentage = 0.75;
  text = 'Hello Angular';
  jsonObject = { name: 'Lalit', age: 25, city: 'Mumbai' };
  
  // Custom pipe examples
  items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  searchText = '';
  longText = 'This is a very long text that needs to be truncated for display purposes';
  truncateLimit = 20;
}
