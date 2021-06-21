export async function fetchWithCsrf(url, fetchOptions) {
    const cookie = document.cookie.match(new RegExp('XSRF-TOKEN=([^;]+)'));
    const csrfToken = cookie && cookie[1];
    console.log(`fetchWithCredentials token=${csrfToken}`);
    const headers = csrfToken ? {...fetchOptions.headers, 'X-XSRF-TOKEN': csrfToken} : fetchOptions.headers;
    const optionsWithCredentials = {
        ...fetchOptions,
        'credentials': 'include',
        headers
    };
    return await fetch(url, optionsWithCredentials);
}

