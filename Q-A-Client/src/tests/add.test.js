const add  = (a, b) => a + b;
const generateName = (name='malempati') => `Your name is ${name}`;

it('should add two numbers', () => {
    const result = add(3, 3);
    expect(result).toBe(6);
});

it('should test a function to return name', () => {
     const name = 'ugesh';
     const finalName = generateName(name);
     expect(finalName).toBe(`Your name is ${name}`);
});


it('should test a function with a default name ', () => {
    const finalName = generateName();
    expect(finalName).toBe('Your name is malempati');
});