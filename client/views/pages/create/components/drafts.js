Template.drafts.rendered = function () {
    $('.ui.tiny.image img')
        .visibility({
            type: 'image',
            transition: 'fade in',
            duration: 1000
        })
}

Template.drafts.events({
    'click .ui.mini.button.remove': function (event) {
        event.preventDefault()
        event.stopPropagation();
        Template.drafts.removeDraft(this)
    }
    ,'click .ui.item.draft': function (event) {
        event.preventDefault()
        Template.create.loadDraft(this)
    }
})

Template.drafts.addToDraft = function(form){
    var draft = {title:form.title.value,body:form.body.value,tags:form.tags.value,last_update:Date.now()}
    var userdata =  Session.get('userdata')

    if(userdata !== undefined)
    {
        var drafts = []
        if ('drafts' in userdata)
            drafts = userdata.drafts
        drafts.push(draft)
        userdata.drafts = drafts
    }
    else
    {
        userdata = []
        userdata.push({ key:   'drafts', value:  [draft] } );
    }

    steemconnect.updateUserMetadata(userdata,function(error){
        if(error)
        {
            console.log(error)
        }
    })
}

Template.drafts.removeDraft = function(draft){
    var userdata = Session.get('userdata')
    userdata.drafts = userdata.drafts.filter(function(el) {
        return el.body !== draft.body;
    });
    steemconnect.updateUserMetadata(userdata,function(error){
        if(error)
        {
            console.log(error)
        }
    })
}
