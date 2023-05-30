export class AddUtil {
    private sum: number = 0;
    public add(y: number): any {
        if (y === undefined) {
            return this.sum;
        } else {
            this.sum += y;
            return this.add.bind(this);
        }
    }
}