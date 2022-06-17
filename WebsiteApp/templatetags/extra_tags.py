from django import template

register = template.Library()


@register.filter('hash')
def hash(h, key):
    return h[key]


@register.filter('dict_items')
def dict_items(d):
    return d.items()
