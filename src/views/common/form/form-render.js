export default {
    name: 'FormRender',
    functional: true,
    props: {
        formItem: Object,
        parent: Object,
        render: Function
    },
    render: (h, ctx) => {
        const params = {
            formItem: ctx.props.formItem,
            vm: ctx.props.parent
        };
        if (ctx.props.content) params.formItem = ctx.props.formItem;
        return ctx.props.render(h, params);
    }
};