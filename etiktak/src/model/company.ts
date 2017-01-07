import { EditableItem} from './editable-item';

export class Company {
  constructor (
    public uuid: string,
    public name: string,
    public editableItems: EditableItem[]
  ) {}
}
