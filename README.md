# IMPORTANT: How to Contribute 
### Overview 
All work is broken into issues. 

Issues are either: <br>

a) Associated with a project. <br>
b) Independent & siloed. 

### Rules of engagement 
- If you are not in a group thread with atsignhandle#2749, you can't contribute, fuck off and don't waste our time. If you are in a group thread and you are competent, welcome, party hard for the next few days, your contribution will be rewarded, otherwise, again fuck off.
- Assign yourself to an issue when you start work. We don't want duplicate work. Likely announce said activity in aforementioned group thread.
- If you assign yourself to a project, you must take on all issues associated with that project. These are inter-dependent issues.
- Ask questions in Github issues when you're discussing a specific issue.
- Ask questions in Discord when you're coordinating in general.
- No we are not changing frameworks (go Svelte!) 

### Issue Legend
* `level 1`: Renders the product un-usable. 
* `level 2`: Seriously hinders product usability. 
* `level 3`: Very helpful to improve product usability. 

### Branches 
The branch `main` is used for all ongoing work. When you decide which issue to attack, create a branch "issue-<issue-number>-fix" and work on that branch. Upon completion do a normal PR. 

`@evmcompatiable` & `@atsignhandle` are the only ones who merge. Please avoid using actual names, except for Steve's.

## Designs 

Work off of the designs [here](https://github.com/atsignhandle/move-token-launch/tree/frontend-production/design%20references) unless otherwise specified. 

Sometimes designs change, or evolve after being coded. Therefore, assume any Github issues represents the most up to date variant. If you can't keep up, see Rule of Engagement 1.

## Other Helpful Notes 

- Initiatives were renamed actions 


# move.xyz splash and token purchase page
This page is to facilitate the contribution of individuals to the move.xyz project. Said contributions will be computed on a bonding curve and distributed via a Merkle distributor. If you contribute and are relatively a joy to work with, welcome, otherwise, see Rules of Engagement 1.

## Firebase functions

Every n minutes, Google PubSub triggers a function which processes Ethereum block transfer functions and extracts the to, from, amount, timestamp, and block. The specific function is watching one address but easily can watch many for any arbitrary amount of time. However, for this repository it is for the duration of the DAO contribution period. All funds incur minimal transfer fee costs and signing of a terms of service. 

The above function is with in the `snapshot` folder.  The PubSub function processes and extracts blockchain data, after fetching the source material, a summary function processes the relevant information in summary form and caches the data in a document.

Some effort was put into making available an assortment of endpoints for creating, viewing, and featuring movements.

Finally, at the end of a contribution period, 
---
# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte@next

# create a new project in my-app
npm init svelte@next my-app
```

> Note: the `@next` is temporary

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

