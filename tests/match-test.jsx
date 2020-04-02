const React = require("react");
const { mount } = require("enzyme");
const { Match } = require("../src/match");

function checkQuizIsDisplayed(driver)  {
    const question = driver.find(".question");
    expect(question.length).toBe(1);

    const answers = driver.find(".answerTags");
    expect(answers.length).toBe(4);
}

test("Enzyme rendered Question", () => {
    const driver = mount(<Match/>);
    checkQuizIsDisplayed(driver);
});


test("Tests do alert", () => {

    const driver = mount(<Match/>);

    let msg = undefined;

    global.alert = (s) =>  {msg = s};

    const first = driver.find(".answerTags").at(0);
    first.simulate("click");

    checkQuizIsDisplayed(driver);
    expect(msg).toBeDefined();
});