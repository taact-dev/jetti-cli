Jetti CLI
==========

The Jetti CLI is used to manage your Jetti account from the command line. It is built using [oclif](https://oclif.io).

For more about Heroku see <https://www.jetti.io>. To get started see <https://app.jetti.io/signup>

Overview
========

This is a Node-based Jetti CLI.  The goals of this project are to provide automated and a developer/operations friendly way to manage Jetti accounts, without having to interact with the Jetti web interface. For example, provide the easy provision or API tokens or task monitoring.

Getting starts
========

The CLI is in beta and the command usage will likely change.

Commands
========

- `jetti auth:login` - Login and authenticate with the Jetti API. Required before using other commands.
- `jetti auth:token` - Provision an API user / token in Jetti. There are API token limits with accounts, so we recommend using existing tokens where possible rather than generating tokens ad-hoc.
- `jetti data-exports:list` - List data exports triggered by users.
- `jetti data-imports:list` - List data imports triggered by users.
- `jetti users:create` - List data imports triggered by users.

Install
========

To get started, you can either checkout the page and build locally. To do this you can `yarn` or `npm install`. Once installed, you can execute commands by running `yarn start {{command}}`. For example, `yarn start data-exports:list -s complete`.

Alternatively, you can install globally through `npm` and using `npx`

- `npm install @jetti/jetti.cli -g`
- `npx jetti {{ command }}`
