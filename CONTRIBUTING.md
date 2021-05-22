# Contribute to DataPack Planet
✨🎉 Hi, welcome, new contributor!  🎉✨

Thanks for taking time to contribute us! The following tutorial will guide you through the contribution.

## Contents
- [How to contribute](#how-to-contribute)
  - [Ask a question](#ask-a-question)
  - [Report a bug](#report-a-bug)
  - [Feature request](#feature-request)
  - [Localisation](#localisation)
  - [Pull request](#pull-request)
- [Styleguide](#styleguide)
  - [JS & TS](#javascript-typescript-and-jsx-tsx)

## How to contribute
### Ask a question
If you want to ask a question, please do **not** summit an issue. You should ask in `#Q&A` of Discussion.

### Report a bug
For report a bug, please report it in issue.
Please describe your question clearly and fill in more information as you can, that will help us understand 
what is happened.

We will review and resolve issue as we can. If you can resolve it, you can check 
*I'd like to work for this issue*.

### Feature request
If you're having an idea, you can describe it in Discussion.

If you're requesting a feature, submit a new issue. Choose *Feature request* template instead *Bug report*

### Localisation
Doesn't see your country in the language list? You can contribute to us. The locale files is in `/src/locale`
folder. Copy the `en-us.ts` file and rename to your own language with intl locale provider. When you do all 
those done, translate the string on the right side of the colon.

**Note:** Do not use Google Translate and make sure the translation identifiers are completed.

### Pull request
1. Fork repo to your *own* account
2. Change codes
3. Using shortcut <kbd>g</kbd><kbd>p</kbd> to switch to **Pull Requests**.
4. Summit a new request

Remember to follow [styleguide](#styleguide).

You should not summit a commit that cannot pass the checks. 
You should write reason clear in the body if there is some special reasons that you cannot pass the test.

## Styleguide
### JavaScript, TypeScript and JSX, TSX
Code lint is using eslint and prettier.

If you do not understand, see [this documentation] for more

[this documentation]: ./dev-docs/detail-rules.md

### Git commit message
All commit message should follow the angular specification, which is:
```text
subject(scope): short description

long description

footer
```
Subject should be one of these:
* feat - a new feature
* fix - bug fix
* docs - docs (readme, contribute, etc.) update
* refactor - a change neither *fix* nor *feat*
* chore - changes that does not modify source code
* style - changes that does not affect the logics

Describe the commit in short description. It should be at most 50 characters.
Use the first-person singular and begin with a verb.

Long description is details about your commit. It should be wrap at 72 characters. 
Markdown is allowed, but you should use readable chars because markdown cannot display as expected in GitHub.

Footer contains closed issues, breaking changes, skip ci, etc.

Only subject and short description is required, others are optional
