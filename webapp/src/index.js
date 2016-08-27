var quill = new Quill('#editor', {
    theme: 'snow'
});

quill.on('text-change', (delta, oldDocDelta, source) => {
    console.log(delta)
});