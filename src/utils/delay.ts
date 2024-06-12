export default function(fn: Promise<any>, timeout: number) {
    return new Promise<any>(resolve => {
        setTimeout(async () => resolve(await fn), timeout)
    })
}
