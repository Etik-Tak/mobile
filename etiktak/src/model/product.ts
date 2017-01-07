import { Company } from './company';
import { Category } from './category';
import { Label } from './label';
import { Tag } from './tag';
import { EditableItem } from './editable-item';

export class Product {
  constructor(
    public uuid: string,
    public name: string,
    public companies: Company[],
    public categories: Category[],
    public labels: Label[],
    public tags: Tag[],
    public editableItems: EditableItem[]
  ) {}
}
