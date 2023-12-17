describe('Date parsing', () => {
    test('should correctly parse date in recognized format', () => {
        const toDate = '2023-12-10T16:53:00';
        const parsedDate = Date.parse(toDate);
        expect(parsedDate).toBe(1691878380000);
    });

    test('should return NaN for date in unrecognized format', () => {
        const toDate = '12/10/2023 16:53:00';
        const parsedDate = Date.parse(toDate);
        expect(isNaN(parsedDate)).toBe(true);
    });

    test('should return NaN for non-date strings', () => {
        const toDate = 'not a date';
        const parsedDate = Date.parse(toDate);
        expect(isNaN(parsedDate)).toBe(true);
    });

    test('should return NaN for non-string values', () => {
        const toDate = 12345;
        const parsedDate = Date.parse(toDate);
        expect(isNaN(parsedDate)).toBe(true);
    });
});