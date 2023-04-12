interface optionsType {
  method: string;
  body?: string;
  headers: any;
}

const HttpRequest = (
  method: string,
  endPoint: string,
  callback: (res: any) => void,
  data?: Object,
) => {
  const options: optionsType = {
    method: method,
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
    },
  };
  if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT')
    options.body = JSON.stringify(data);

  fetch('https://web-dev.dev.kimo.ai/v1' + endPoint, options)
    .then(res => res.json())
    .then(res => callback(res));
};

export default HttpRequest;
