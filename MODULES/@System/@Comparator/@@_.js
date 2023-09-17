class Comparator {
    constructor() { }
    Compare(arr1, arr2) {
        if (arr1 && arr2) {
            return arr2.filter((element) => !arr1.includes(element));
        } else {
            return new Error("Не були передані масиви");
        }
    }
}