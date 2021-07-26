//Task 1
enum Fruit {
  BANANA = 'banana',
  ORANGE = 'orange',
  KIWI = 'kiwi',
  APPLE = 'apple'
}
type FruitBasket = { [key in Fruit]: number };
const fruitBasket: FruitBasket = {
  banana: 2,
  orange: 3,
  kiwi: 2,
  apple: 3
};
//Task 2
enum Gender {
  Male = 'male',
  Female = 'female'
}
class Person {
  name: string;
  gender: Gender;
  age: number;
  likes: string[];
  constructor(name: string, gender: Gender, age: number, likes: string[]) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.likes = likes;
  }
  public introduce(): string {
    const {
      name,
      gender,
      age,
      likes
    }: { name: string; gender: Gender; age: number; likes: string[] } = this;
    const goodLookingMap: Map<string, string> = new Map([
      ['male', 'handsome'],
      ['female', 'cute']
    ]);
    return `
    Hello, I'm ${name}, ${age} years old, I like: ${likes.join(', ')}. 
    As you can see, I'm quite ${goodLookingMap.get(gender)} too!
  `;
  }
}
const person = new Person('name', Gender.Female, 21, [
  'football',
  'basketball'
]);
console.log(person.introduce());
//Task 3
type promiseResolve = string[] | [];
type Ilogger = {
  log(err: Error): void;
};
class MovieService<T extends Ilogger> {
  private logger: T;
  public constructor(logger: T) {
    this.logger = logger;
  }
  public getMovies(): Promise<promiseResolve> {
    return new Promise(
      (
        resolve: (value: promiseResolve) => void,
        reject: (value: promiseResolve) => void
      ) => {
        throw new Error('123');
        resolve(['Jaws', 'Spider-Man']);
      }
    ).catch(
      (err: Error): string[] => {
        this.logger.log(err);
        return [];
      }
    );
  }
}
class loggerOne implements Ilogger {
  public log(err: Error): void {
    console.log('sending to log storage 1', err);
  }
}
class LoggerTwo implements Ilogger {
  public log(err: Error): void {
    console.log('sending to log storage 2', err);
  }
}
const moviveService: MovieService<Ilogger> = new MovieService<Ilogger>(
  new LoggerTwo()
);
moviveService.getMovies();
