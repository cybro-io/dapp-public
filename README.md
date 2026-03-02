## Cybro App

### Getting Started

You will need to put the env file to the project root

First, install all the dependencies

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Other scripts

### Production build

#### Generate types for Smart Contracts and API types and hooks

```bash
npm run codegen
```

#### Generate types for Smart Contracts

```bash
npm run codegen-sc-with-index
```

#### Generate API types and hooks

```bash
npm run codegen-api-with-index
```

#### Build the project

```bash
npm run build
```

#### Start the production build

```bash
npm run start
```

### Lint

```bash
npm run lint
```

### Client Package

Client package's file structure is based on [Feature-Sliced Design methodology](https://feature-sliced.design/) and thus some conventions and restrictions apply to how parts of the client application are stored, imported, and composed.

#### 1. Top-level Directories

1.1. Top-level directories inside `src/` are: `app`, `pages`, `widgets`, `features`, `entities` and `shared`.

1.2. Each top-level directory relates to one another in a _hierarchical manner_ and represents a specific _abstraction layer_ in this hierarchy, **being allowed to import from the lower abstraction layers while from the higher ones - not**. Position and designation of each directory are as follows:

##### 1.3. `app/`

`app/` is the topmost layer which **contains client application's global configuration files and providers that, once set up, are very unlikely to change** in the future. Examples: Localization settings, environment variables, theme configuration.

> **Note:** Since Next.js is being used, we store pages in this directory as well. Given that `app/` is supposed to store configuration settings and environment variables which may (and highly likely will) be needed across the application, **it is permitted to import _only_ those configuration settings on the lower layers**. Other than that, one must not import any other functionality from the `app/` directory.

##### 1.4. `widgets/`

`widgets/` is where **concrete condition-determined (e.g. by role) logic** resides (mostly `components` and adjacent functionality upon need).

##### 1.5. `features/`

`features/` directory contains `components`, `hooks`, `utils`, `constants`, and `types` that are **related to specific features**, yet remain fairly abstract. Here, a _"feature"_ refers to a **complete use-case scenario**, and _"fair abstraction"_ implies the **underlying logic, agnostic of any conditions that might alter the behavior.**

##### 1.6. `entities/`

`entities/` stores common (feature-agnostic) `constants`, `types`, `hooks` and `utils` **specific to certain _business entities_** and mainly serving as **an interface to a database entity**. It's unlikely that `components` will fall into this directory.

> **Note:** Rule of thumb to define whether or not the object in question **is a business entity** is to check if it **has a corresponding table defined in the database.**

##### 1.7. `shared/`

The lowest-level layer, `shared/`, **contains project-agnostic, general purpose, abstract** `components`, `utils`, `hooks` etc. Most of `shared` functionality is going to be moved to `persik` eventually, but until that happens the directory will mainly serve the purpose.

#### 2. Mid-level Directories or Slices

2.1. Each top-level directory contains subfolders which are, _most of the time_, **segregated based on _domain_ (`auth`, `notifications` etc.)**, and not on _unit type_ (`components`, `hooks` etc.).

2.2. **The segregation rule must strictly apply to `pages`, `widgets`, `features` and `entities`** while for `app` and `shared` other approaches might be seen fit.

2.3. In most cases, especially when logic is grouped by domain, **cross-imports between slices must not be allowed**. (with the exception of `pages/router` importing from `pages/*`)

#### 3. Bottom-level Directories or Segments

3.1. Each mid-level directory contains subfolders which are, **depending on distinction rule of a particular section's slices**, can be segregated based on either _unit type_ (`components`, `hooks` etc.) or _domain_ (`auth`, `notifications` etc.).

3.2. Unlike top-level sections and slices, **segments within the same slice are allowed to have cross imports**.

3.3. **It's forbidden to create directories inside segments**.

> **The only exception:** breaking of a single, logically cohesive unit into multiple pieces (Example: `SomeProvider/` containing `SomeContext.ts` and `SomeProvider.tsx` files)

#### TL:DR - A Right Place for a Module

| App                                       | Pages                                             | Widgets                                     |
| ----------------------------------------- | ------------------------------------------------- | ------------------------------------------- |
| It will likely stay unchanged.            | It defines a page component.                      | It specifies an existing use-case scenario. |
| It is used in application root only.      | It is a unit specific to a single page component. | -                                           |
| It contains global configuration.         | It defines a part of routing system.              | -                                           |
| It sets up globally used functionalities. | -                                                 | -                                           |

| Features                                            | Entities                                                      | Shared                              |
| --------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------- |
| It defines core logic for a use-case scenario.      | It defines a business entity or its characteristics.          | It is not specific to the project.  |
| It is used exclusively to support a single feature. | It relates to a database table.                               | It is used in multiple `entities/`. |
| -                                                   | It provides a part of API between DB and the application.     | -                                   |
| -                                                   | It defines low-level feature-agnostic, entity-specific logic. | -                                   |

## Style Guide

### 1. Naming conventions

#### 1.1. Don't use one-letter names, be more specific

```ts
// bad
const onChange = (v: string) => ...;

// good
const onChange = (name: string) => ...;
```

#### 1.2. Use meaningful names for iterables

```ts
// bad
const dates = products.map((el) => el.date);

// good
const dates = products.map((product) => product.date);
```

#### 1.3. Use verbs such as **is**, **has** or **can** as prefix to name boolean variables

```ts
// bad
const person = true;
const personIs = true;
const [open, setOpen] = React.useState(false);

// good
const isPerson = false;
const [isOpen, setIsOpen] = React.useState(false);
const canEditDocument = usePermission();
```

#### 1.4. Use uppercase for constant variables

```ts
// bad
const hours = 60 * 60 * 1000;

// good
const HOURS = 60 * 60 * 1000;
```

#### 1.5. Use underscore (`_`) prefix for unused variables

### 2. Ordering

#### 2.1. Order of hooks in component

1. Hooks from external libraries, e.g. React Router Dom hooks (`useNavigate`, `useLocation`)
2. Custom hooks (`useCurrentUser`, `useContext`, etc.)
3. React `useState` hook
4. Other React hooks

```ts
// bad
export const CarCard: React.FC = () => {
  const [car, setCar] = React.useState<Car | null>(null);
  const params = useParams();

  const classes = useStyles();

  const { loading, data } = useQuery(CAR_QUERY);

  const { logout } = useAppAuth();
};
```

```ts
// good
export const CarCard: React.FC = () => {
  const classes = useStyles();

  const params = useParams();
  const { logout } = useAppAuth();

  const [car, setCar] = React.useState<Car | null>(null);

  const { loading, data } = useQuery(CARD_QUERY);
};
```

#### 2.2. Required properties should come before optional in types and interfaces

```ts
// bad
export interface CardProps {
  name?: string;
  id: number;
  errorText?: string;
}
```

```ts
// good
export interface CardProps {
  id: number;
  name?: string;
  errorText?: string;
}
```

#### 2.3. `null` and `undefined` types should come after the primary type

```ts
// bad
const [user, setUser] = Reacct.useState<null | undefined | User>(null);
```

```ts
// good
const [user, setUser] = Reacct.useState<User | null | undefined>(null);
```

> **Pro tip**: use the `Nullable` shared type in such cases

#### 2.4. Interface of a component should be declared right before it

```ts
// bad
interface CarCardProps {
 name: string;
 ...
}

const useStyles = makeStyles((theme: Theme) => ({
 title: {
  padding: 0,
 },
}));

const DEFAULT_COUNT = 0;


const CarCard: React.FC<CarCardProps> => ...
```

```ts
// good
...
const DEFAULT_COUNT = 0;
...

interface CarCardProps {
 name: string;
 ...
}

const CarCard: React.FC<CarCardProps> => ...
```

### 3. Typing

#### 3.1. If possible, avoid using `any` type

```ts
// bad
const inputFileRef = React.useRef<any>(null);
const [user, setUser] = React.useState<any>(null);

// good
const inputFileRef = React.useRef<HTMLInputElement | null>(null);
const [user, setUser] = React.useState<User | null>(null);
```

#### 3.2. Don't declare types inline

```ts
// bad
function disconnectUsers(users: { id: string; name: string }[]);
```

```ts
// good
export type User = {
  id: number;
  name: string;
};

function disconnectUsers(users: Array<User>);
```

### 4. React

#### 4.1. Don't import anything from React

```ts
// bad
import React, { useState, useCallback, useRef, FC } from 'react';

// best
import React from 'react';

const [state, setState] = React.useState(null);
React.useEffect...
React.useCallback...
```

### 5. Misc

#### 5.1. A comment must be left where eslint is disabled

```ts
// bad
console.log({ data }); // get eslint warning 'ESLint: Unexpected console statement.(no-console)'

// eslint-disable-next-line no-console
console.log({ data }); // just ignorring warnings

...

// best
// some comment explaining why we ignore this piece of code
// eslint-disable-next-line no-console
console.log({ data });
```

#### 5.2. Default exports should be avoided

```ts
// bad
const Component: React.FC = () => null;
export default Component;

// good
export const Component: React.FC = () => null;
```

#### 5.3. Named re-exports should be avoided (eg in `index.ts` files)

```ts
// bad
export { someFunction } from './module';

// good
export * from './module';
```
