export const controller = new AbortController()

// enum Methods { 'GET','POST','PATCH','PUT','DELETE' }

export type Response = { status: number, error: string, message: string, data: any }

type Props = (
    url:string,
    method?: 'GET'|'POST'|'PATCH'|'PUT'|'DELETE',
    body?:{},
    urlToken?: string
) => Promise<Response>

export const Fetcher:Props = async (url, method = 'GET', body, urlToken ) => {

  const { signal } = controller;
  const token = localStorage.getItem("token");
    
  const headers:any = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }

  /** 
   * If there's no token in the cache
   * Remove the auth header 
   * */
  if(token || urlToken)
  headers.Authorization = `Bearer ${urlToken || token}`

  const request = await fetch(
    url, 
    {
      headers,
      method,
      signal,
      body:JSON.stringify(body),
    }
  );
  const response:Response = await request.json()
  let message;
  /**
   * if a response got an error 
   * it will be thrown by the below if conditions
   */
  if(response.status !== 200 && response.status !== 201){
    if(response.error.length > response.message.length){
      message = response.error
    }else{
      message = response.message
    }
    //
    throw new Error( message )
  }

  return response;
};
