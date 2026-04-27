import {
 CommonActions,
 createNavigationContainerRef,
 ParamListBase,
 StackActions,
 TabActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<ParamListBase>();

export const NavigationManager = <T extends ParamListBase>() => {
 type Args<RouteName extends keyof T> = RouteName extends unknown
   ? undefined extends T[RouteName]
     ? [screen: RouteName] | [name: RouteName, params?: T[RouteName]]
     : [name: RouteName, params: T[RouteName]]
   : never;

 const navigate = <RouteName extends keyof T>(
   ...args: Args<RouteName>
 ): void => {
   if (navigationRef.isReady()) {
     const [name, params] = args;
     const nameAsString = name.toString();
     navigationRef.dispatch(CommonActions.navigate(nameAsString, params!));
   }
 };

 const push = <RouteName extends keyof T>(...args: Args<RouteName>): void => {
   if (navigationRef.isReady()) {
     const [name, params] = args;
     const nameAsString = name.toString();
     navigationRef.dispatch(StackActions.push(nameAsString, params!));
   }
 };


 const replace = <RouteName extends keyof T>(
   ...args: Args<RouteName>
 ): void => {
   if (navigationRef.isReady()) {
     const [name, params] = args;
     const nameAsString = name.toString();
     navigationRef.dispatch(StackActions.replace(nameAsString, params!));
   }
 };

 const reset = <RouteName extends keyof T>(
   routes: Array<{ name: RouteName; params?: T[RouteName] }>
 ): void => {
   if (navigationRef.isReady()) {
     navigationRef.dispatch(
       CommonActions.reset({
         index: 0,
         routes: routes.map((route) => ({
           ...route,
           name: route.name.toString(),
           params: route.params as Readonly<object> | undefined,
         })),
       })
     );
   }
 };

 const popToTop = () => {
   if (navigationRef.isReady()) {
     navigationRef.current?.dispatch(StackActions.popToTop());
   }
 };

 const pop = (count?: number | undefined) => {
   if (navigationRef.isReady()) {
     navigationRef.current?.dispatch(StackActions.pop(count));
   }
 };

 const getCurrentRoute = () => {
   if (navigationRef.isReady()) {
     return navigationRef.current?.getCurrentRoute();
   }
   return '';
 };
 return { navigate, push, replace, reset, popToTop, pop, getCurrentRoute };
};