export const isCurrentNavItem = (currentPathName: string, path: string) => {
    if (currentPathName === path)
        return true;
    return path !== "/manage" && currentPathName.indexOf(path) >= 0;
}