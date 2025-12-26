import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filmMakerTable'
})
export class FilmMakerTablePipe implements PipeTransform {

    transform(value: unknown, args: unknown): unknown {
        if (args === 'country') {
            return (value as any).name;
        }

        if (args === 'roles') {
            return (value as any).map((role: any) => role.name).join(', ');
        }

        return value;
    }

}
