import {Outlet} from 'react-router';
import type {Route} from './+types/client.a';
import {aContext, rootContext} from '~/lib/context';

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
  async ({context}, next) => {
    console.log('start a middleware');
    context.set(aContext, 'A');
    await next();
    console.log('end a middleware');
  },
];

export function clientLoader({context}: Route.ClientLoaderArgs) {
  return {
    root: context.get(rootContext),
    a: context.get(aContext),
  };
}

export default function A({loaderData}: Route.ComponentProps) {
  return (
    <>
      <h1>A</h1>
      <p>{JSON.stringify(loaderData, null, 2)}</p>
      <Outlet />
    </>
  );
}