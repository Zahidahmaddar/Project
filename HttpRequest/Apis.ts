import HttpRequest from './HttpRequest';

export const HighlightsApi = (callback: (res: any) => void, data?: any) => {
  HttpRequest('GET', '/highlights', callback);
};

export const CategoriesApi = (callback: (res: any) => void, data?: any) => {
  HttpRequest('GET', '/categories', callback);
};

export const ActivitiesApi = (callback: (res: any) => void, data?: any) => {
  HttpRequest('GET', '/activities/' + data, callback);
};
