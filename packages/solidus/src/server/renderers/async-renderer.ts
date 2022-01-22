import { renderToString, renderToStringAsync } from 'solid-js/web';
import { Component, JSX } from 'solid-js';
import { ApplicationComponent } from '../../types/application-component.type';

export const renderAsync = async (App: ApplicationComponent, url: string): Promise<string> => {
    return await renderToStringAsync(() => <App url={url}/>);
}