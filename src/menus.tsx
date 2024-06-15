export interface Menu {
  code: string;
  name: string;
  path: string;
  children?: Menu[];
  icon?: any;
  isExpanded?: boolean;
}

export function merge(src: Menu | undefined): Menu | undefined {
  if (!src) {
    return undefined;
  }
  let dst = {
    name: src.name,
    code: src.code,
    path: src.path,
    icon: src.icon,
  } as Menu;
  if (src.children) {
    dst.children = [];
    for (let i = 0; i < src.children.length; i++) {
      if (MENUS[src.children[i].code]) {
        let v = merge(src.children[i]);
        if (v) {
          v.icon = MENUS[src.children[i].code].icon;
          dst.children.push(v);
        }
      }
    }
  }
  return dst;
}

const MENUS: Record<string, any> = {
  System: { icon: <>?</> },
  home: { icon: <>?</> },
  admin: { icon: <>?</> },
  apps: { icon: <>?</> },
  'apps.list': { icon: <>?</> },
  users: { icon: <>?</> },
  roles: { icon: <>?</> },
  menus: { icon: <>?</> },
  settings: { icon: <>?</> },
};

export default MENUS;
