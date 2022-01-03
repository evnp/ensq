import ensq, { ENSQElm } from "../src/ensq";

enum Name {
  Ship,
}
enum Elements {
  engine,
  part,
}
enum Conditionals {
  warp,
  adrift,
}

function validate(...valueConditionPairs: Array<[unknown, unknown]>): void {
  for (const [value, condition] of valueConditionPairs) {
    if (typeof condition === "function") {
      expect(condition(value)).toBe(true);
    } else {
      expect(condition === value).toBe(true);
    }
  }
}

describe("ENSQ", () => {
  const isWarbird = (elm: ENSQElm) => elm().getAttribute("name") === "Warbird";
  const isEnterprise = (elm: ENSQElm) =>
    elm().getAttribute("name") === "Enterprise";
  //const isReplicator = (elm) => elm()?.getAttribute("type") === "replicator";
  //const isNacelle = (elm) => elm()?.getAttribute("type") === "nacelle";

  test("base element", async () => {
    const Ship = ensq<typeof Name, typeof Elements, typeof Conditionals>(
      Name,
      Elements,
      Conditionals
    );

    // for alt form:
    const en = Ship;

    // test elm querying:
    validate(
      [Ship(app).elm(), {}],
      [Ship(app).elm(0), {}],
      [Ship(app).elm(2), {}],
      [Ship(app).elm(-2), {}],
      [Ship(app).elm(isEnterprise), {}],
      [Ship(app).elm.num(), 4],
      [Ship(app).elm.all(), []],
      [Ship(app).elm.num(2), null],
      [Ship(app).elm.num(4), 4],
      [Ship(app).elm.all(2), null],
      [Ship(app).elm.all(4), []],
      [Ship(app).elm.num(isWarbird), 2],
      [Ship(app).elm.all(isWarbird), []]
    );

    // test alt form:
    validate(
      [en(app).Ship.elm(), {}],
      [en(app).Ship.elm(0), {}],
      [en(app).Ship.elm(2), {}],
      [en(app).Ship.elm(-2), {}],
      [en(app).Ship.elm(isEnterprise), {}],
      [en(app).Ship.elm.num(), 4],
      [en(app).Ship.elm.all(), []],
      [en(app).Ship.elm.num(2), null],
      [en(app).Ship.elm.num(4), 4],
      [en(app).Ship.elm.all(2), null],
      [en(app).Ship.elm.all(4), []],
      [en(app).Ship.elm.num(isWarbird), 2],
      [en(app).Ship.elm.all(isWarbird), []]
    );

    // test async querying:
    validate(
      [await Ship(app).elm.until(), {}],
      [await Ship(app).elm.until(0), {}],
      [await Ship(app).elm.until(2), {}],
      [await Ship(app).elm.until(-2), {}],
      [await Ship(app).elm.until(isEnterprise), {}],
      [await Ship(app).elm.until((elm) => elm()), {}],
      [await Ship(app).elm.until((elm) => elm(0)), {}],
      [await Ship(app).elm.until((elm) => elm(2)), {}],
      [await Ship(app).elm.until((elm) => elm(-2)), {}],
      [await Ship(app).elm.until((elm) => elm(isEnterprise)), {}],
      [await Ship(app).elm.until.num(4), 4],
      [await Ship(app).elm.until.all(4), []],
      [await Ship(app).elm.until.num((elm) => elm.num(4)), 4],
      [await Ship(app).elm.until.all((elm) => elm.all(4)), []]
    );

    // test async querying alt form:
    validate(
      [await en(app).Ship.elm.until(), {}],
      [await en(app).Ship.elm.until(0), {}],
      [await en(app).Ship.elm.until(2), {}],
      [await en(app).Ship.elm.until(-2), {}],
      [await en(app).Ship.elm.until(isEnterprise), {}],
      [await en(app).Ship.elm.until((elm) => elm()), {}],
      [await en(app).Ship.elm.until((elm) => elm(0)), {}],
      [await en(app).Ship.elm.until((elm) => elm(2)), {}],
      [await en(app).Ship.elm.until((elm) => elm(-2)), {}],
      [await en(app).Ship.elm.until((elm) => elm(isEnterprise)), {}],
      [await en(app).Ship.elm.until.num(4), 4],
      [await en(app).Ship.elm.until.all(4), []],
      [await en(app).Ship.elm.until.num((elm) => elm.num(4)), 4],
      [await en(app).Ship.elm.until.all((elm) => elm.all(4)), []]
    );
  });

  test("sub-elements", async () => {
    // TODO
    // expect(Ship(app).engine.get()).toBe();
    // expect(Ship(app).part.all()).toBe();
    // expect(Ship(app).part.find()).toBe();
    // expect(Ship(app).engine.find(isNacelle)).toBe();
    // expect(Ship(app).engine.part.nth(2)).toBe();
    // expect(Ship(app).part.engine.exists()).toBeFalse();
    // expect(Ship(app).part.engine.exists(false)).toBeTrue();
    // expect(Ship(app).part.engine.count(6)).toBeFalse();
    // expect(Ship(app).part.engine.count(4)).toBeTrue();
    // expect(await Ship(app).until.part.get()).toBe();
    // expect(await Ship(app).until.engine.all()).toBe();
    // expect(await Ship(app).until.engine.find()).toBe();
    // expect(await Ship(app).until.part.find(isReplicator)).toBe();
    // expect(await Ship(app).until.engine.part.nth(3)).toBe();
    // expect(await Ship(app).until.part.engine.exists()).toBeFalse();
    // expect(await Ship(app).until.part.engine.exists(false)).toBeTrue();
    // expect(await Ship(app).until.part.engine.count(6)).toBeTrue();
  });

  test("conditional classes", async () => {
    // TODO
    // expect(Ship(app).warp.get()).toBe();
    // expect(Ship(app).adrift.all()).toBe();
    // expect(Ship(app).adrift.find()).toBe();
    // expect(Ship(app).warp.find(isWarp)).toBe();
    // expect(Ship(app).warp.adrift.nth(2)).toBe();
    // expect(Ship(app).adrift.warp.exists()).toBeFalse();
    // expect(Ship(app).adrift.warp.exists(false)).toBeTrue();
    // expect(Ship(app).adrift.warp.count(6)).toBeFalse();
    // expect(Ship(app).adrift.warp.count(4)).toBeTrue();
    // expect(await Ship(app).until.adrift.get()).toBe();
    // expect(await Ship(app).until.warp.all()).toBe();
    // expect(await Ship(app).until.warp.find()).toBe();
    // expect(await Ship(app).until.adrift.find(isAdrift)).toBe();
    // expect(await Ship(app).until.warp.adrift.nth(3)).toBe();
    // expect(await Ship(app).until.adrift.warp.exists()).toBeFalse();
    // expect(await Ship(app).until.adrift.warp.exists(false)).toBeTrue();
    // expect(await Ship(app).until.adrift.warp.count(6)).toBeTrue();
  });

  test("element conditional classes", async () => {
    // TODO
    // expect(Ship(app).engine.warp.get()).toBe();
    // expect(Ship(app).part.adrift.all()).toBe();
    // expect(Ship(app).engine.adrift.find()).toBe();
    // expect(Ship(app).part.warp.find(isReplicator)).toBe();
    // expect(Ship(app).engine.warp.adrift.nth(2)).toBe();
    // expect(Ship(app).part.adrift.warp.exists()).toBeFalse();
    // expect(Ship(app).engine.adrift.warp.exists(false)).toBeTrue();
    // expect(Ship(app).part.adrift.warp.count(6)).toBeFalse();
    // expect(Ship(app).engine.adrift.warp.count(4)).toBeTrue();
    // expect(await Ship(app).until.part.adrift.get()).toBe();
    // expect(await Ship(app).until.engine.warp.all()).toBe();
    // expect(await Ship(app).until.part.warp.find()).toBe();
    // expect(await Ship(app).until.engine.adrift.find(isNacelle)).toBe();
    // expect(await Ship(app).until.part.warp.adrift.nth(3)).toBe();
    // expect(await Ship(app).until.engine.adrift.warp.exists()).toBeFalse();
    // expect(await Ship(app).until.part.adrift.warp.exists(false)).toBeTrue();
    // expect(await Ship(app).until.engine.adrift.warp.count(6)).toBeTrue();
  });

  test("scoping by raw element", async () => {
    // TODO
    // const engine = Ship(app).Ship.engine.get();
    // expect(Ship(engine).warp.get()).toBe();
    // expect(Ship(engine).part.adrift.all()).toBe();
    // expect(Ship(engine).adrift.find()).toBe();
    // expect(Ship(engine).part.warp.find(isReplicator)).toBe();
    // expect(Ship(engine).warp.adrift.nth(2)).toBe();
    // expect(Ship(engine).part.adrift.warp.exists()).toBeFalse();
    // expect(Ship(engine).adrift.warp.exists(false)).toBeTrue();
    // expect(Ship(engine).part.adrift.warp.count(6)).toBeFalse();
    // expect(Ship(engine).adrift.warp.count(4)).toBeTrue();
    // expect(await Ship(engine).until.part.adrift.get()).toBe();
    // expect(await Ship(engine).until.warp.all()).toBe();
    // expect(await Ship(engine).until.part.warp.find()).toBe();
    // expect(await Ship(engine).until.adrift.find(isNacelle)).toBe();
    // expect(await Ship(engine).until.part.warp.adrift.nth(3)).toBe();
    // expect(await Ship(engine).until.adrift.warp.exists()).toBeFalse();
    // expect(await Ship(engine).until.part.adrift.warp.exists(false)).toBeTrue();
    // expect(await Ship(engine).until.adrift.warp.count(6)).toBeTrue();
  });

  test("scoping by ENSQ object", async () => {
    // TODO
    // const engine = Ship(app).Ship.engine;
    // expect(Ship(engine).warp.get()).toBe();
    // expect(Ship(engine).part.adrift.all()).toBe();
    // expect(Ship(engine).adrift.find()).toBe();
    // expect(Ship(engine).part.warp.find(isReplicator)).toBe();
    // expect(Ship(engine).warp.adrift.nth(2)).toBe();
    // expect(Ship(engine).part.adrift.warp.exists()).toBeFalse();
    // expect(Ship(engine).adrift.warp.exists(false)).toBeTrue();
    // expect(Ship(engine).part.adrift.warp.count(6)).toBeFalse();
    // expect(Ship(engine).adrift.warp.count(4)).toBeTrue();
    // expect(await Ship(engine).until.part.adrift.get()).toBe();
    // expect(await Ship(engine).until.warp.all()).toBe();
    // expect(await Ship(engine).until.part.warp.find()).toBe();
    // expect(await Ship(engine).until.adrift.find(isNacelle)).toBe();
    // expect(await Ship(engine).until.part.warp.adrift.nth(3)).toBe();
    // expect(await Ship(engine).until.adrift.warp.exists()).toBeFalse();
    // expect(await Ship(engine).until.part.adrift.warp.exists(false)).toBeTrue();
    // expect(await Ship(engine).until.adrift.warp.count(6)).toBeTrue();
  });

  test("events", async () => {
    // TODO
    // expect(Ship(app).click()).toBe();
    // expect(await Ship(app).click().render()).toBe();
    // expect(Ship(app).part.all()).toBe();
    // expect(Ship(app).part.find()).toBe();
    // expect(Ship(app).engine.find(isNacelle)).toBe();
    // expect(Ship(app).engine.part.nth(2)).toBe();
    // expect(Ship(app).part.engine.exists()).toBeFalse();
    // expect(Ship(app).part.engine.exists(false)).toBeTrue();
    // expect(Ship(app).part.engine.count(6)).toBeFalse();
    // expect(Ship(app).part.engine.count(4)).toBeTrue();
  });
});
