Jetti CLI
==========

The Jetti CLI is used to manage your Jetti account from the command line. It is built using [oclif](https://oclif.io).

For more about Jetti see <https://www.jetti.io>. To get started see <https://app.jetti.io/signup>

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
- `jetti inventory-feeds:list` - List inventory feeds in Jetti.
- `jetti users:create` - List data imports triggered by users.
- `jetti api:batch --resource` - Batch update a resource in Jetti.
- `jetti sales:update --resource` - Update a sale.
- `jetti sales:clone --resource` - Clone a sale.
- `jetti purchases:rates --id [:id] --trace-deprecation` - Generate shipping rates from order id.
- `jetti purchases:default-label --id [:id]` - Generate shipping label with default rates.

Install
========

You can install globally through `npm` and using `npx`

- `npm install @jetti/jetti.cli -g`
- `jetti {{ command }}` or `npx jetti {{ command }}`

Alternatively, to get started, you can either checkout the page and build locally. To do this you can `yarn` or `npm install`. Once installed, you can execute commands by running `yarn start {{command}}`. For example, `yarn start data-exports:list -s complete`.

![](https://p-wrF6mq.t4.n0.cdn.getcloudapp.com/items/4guOkqGy/14930774-9b19-4c6a-97dc-c91ec9f53b2d.png?v=666bc97a9c1aed835b743272c74dfcf2)
