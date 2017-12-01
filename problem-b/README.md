# Problem B

In this short exercise you will practice using CSS in JS to style a pair of "button" components. You will use an external library to define classes that are "local" to each button type, allowing them to have the same class names (at least from a developer's perspective).

- Note that these instructions and the provided tests assume you are using the [Aphrodite](https://github.com/Khan/aphrodite) library. However, you can receive credit for this problem by using CSS Modules or [any other CSS-in-JS system](https://github.com/MicheleBertoli/css-in-js) of your choosing.

## Running the Program
Because this app is created with React (and scaffolded through Create React App), you will need to install dependencies and run a developer web server in order to transpile and view the application. You can run this server by using the command:

```bash
# must be inside the `problem-b/` folder
cd path/to/problem-b

# install dependencies
npm install  # only once per problem

# run the server
npm start
```

You can then view the rendered page _in a web browser_. Remember to check the Developer console for any errors!


## Exercise Instructions
To complete the exercise, edit the included **`src/components/FlatButton.js`** and **`src/components/ActionButton.js`** files and add in the required code. You should _not_ modify `index.js`, `index.html`, or create any global CSS files. However, if you choose to utilize a different CSS-in-JS technique (e.g., CSS Modules), you may need to make further modifications as well, such as ejecting from Create React App or creating local CSS stylesheets.

1. Begin by providing default styling for the `<FlatButton>` component (defined in `src/components/FlatButton.js`). In this file, import the `StyleSheet` object from the `aphrodite` library, and use its `create()` function to define a style sheet inside the JavaScript

    Begin by defining a **`btn`** style class. Elements with this class should have a font-size of `1.25rem`, and `.5rem` of padding all the way around.

    In order to specify the color of these elements, you should `import` the color constants from the `styles/colors.js` file. Note that you can import _call_ the exported colors into a single `colors` object with `import * as colors`.

    Specify in your stylesheet that `.btn` elements should have a (text) color that is the `primary` color, a background color that is `white`, and a border that is the `primary` color.

2. Add a `className` property to the rendered `<button>` element so that it is given the `.btn` class. Use the **`css()`** helper method (which you will need to also import from Aphrodite). This will allow you to see your styling!

3. Add additional properties to the `.btn` class definition so that when the element is hovered over, it's text color changes to `white` and its background color changes to the `primary` color. Additionally, when the element is pressed (becomes `active`), it's background color should become the `primaryDark` color.

    Now you should have a styled and interactive purple button!

4. Define a second style class in your stylesheet called **`dark`**, which will represent a "dark" version of the button. A dark button should have a text color that is `white` and a background color that is the `primary` color.

    Because this is the same styling as the "hover" effect but we want to give feedback that the button is clickable, also specify that the [`cursor`](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) should be a `pointer` finger.

5. Modify the `className` given to the `<button>` so that _if_ the `FlatButton` component has the **`dark` prop**, the element is styled with _both_ the `.btn` and `.dark` classes. See [here](https://github.com/Khan/aphrodite#conditionally-applying-styles) for an example of conditionally applying styles. Alternatively you could install and utilize the [classnames](https://www.npmjs.com/package/classnames) package (remember to `--save` it as a dependency!)

    Now you should be able to see both a normal and "dark" version of the buttons.

6. Add a **`disabled`** class to your stylesheet representing when the button is disabled. A disabled button should have an _opacity_ of `.65`. In order to disable the hover changes (since it can't be pressed), also give it a [`pointer-events`](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) value of `none`.

    Again, specify that if the `FlatButton` component has the **`disabled` prop**, the button is given the `.disabled` class (in addition to the `.btn` and possibly the `.dark` classes).

7. In order to demonstrate how CSS-in-JS allows style classes to be made _local_, you should also provide styling for the `<ActionButton>` component (defined in `src/components/ActionButton.js`), making it look like Material Design's [Floating Action Button](https://material.io/guidelines/components/buttons-floating-action-button.html).

    For this Component, create another stylesheet that **also** has a **`btn`** class (the name must be the same)! This style class should specify the following properties:

    - The font-size should be an absolute `24px`. Note that with Aphrodite, any numeric values will be treated as have `px` units.
    - The (text) color should be `white`, and the background color should be `secondary` color from the `colors.js` module.
    - The element should have a `border-radius` of `50%` (to make it round), as well as a border that is `transparent` (to remove default border styling).
    - The element should be given a `width` and `height` of `56px`. Remember to make the element `inline-block` so that the width and height will be applied!
    - Finally, give the element the following double-layered `box-shadow`:

        ```css
        rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px
        ```

    As with `FlatButton`, specify that the rendered `<button>` element should have the `.btn` class. You can even copy-and-paste your `className` logic from `FlatButton.js`.

8. Make the `ActionButton` "move" when pressed by specifying that when it becomes "active", its box-shadow should change to `rgba(0, 0, 0, 0.19) 0px 10px 30px, rgba(0, 0, 0, 0.23) 0px 6px 10px`. Note that this will make the button seem to "rise" to meet the user's finger.

    - Ideally you'd use a [transition](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) to animate the movement, but that is not necessary for this exercise.

    You should also disable the "focus" box that Chrome provides by giving the element an `outline` of `0`. Note that this technique can have major impacts on accessibility and should be used with caution!

9. Finally, specify a `.disabled` class for the button (again for when it has the `disabled` prop). This class should specify the same style rules as for the disabled `FlatButton`, with an additional property of setting the box-shadow to be `'none'`.

    - To avoid duplicating code, you could define the object that contains these properties in a separate module (maybe `styles/common.js`), and then `import` and assign that object to each Component's stylesheet. Alternatively, if you're using CSS Modules, this is a great place to do composition! 

In the end, you should be able to see your different buttons, which have local non-conflicting class names (while also sharing a color scheme).

## Testing
This exercise comes with a suite of _unit tests_ that you can use to check your work and understanding. Tests are **not** guaranteed to be comprehensive.

In order to run these tests, you will need to have the [Jest](https://facebook.github.io/jest/) test runner installed **globally**. You will also need to install the test dependencies listed in the `package.json` file:

```bash
npm link jest  # make jest available as dependency
npm install
```

You can run these tests by using the `jest` command from the repo's root directory, specifying the problem to test as an argument:

```bash
# run tests for problemA
jest problemA

# run tests for all problems
jest
```