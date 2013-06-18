'use strict';

/* Services */

angular.module('ginkgo.services', []).
    value('version', '0.1').
    value('localStorage', window.localStorage).
    service('tags', function (localStorage, $rootScope) {
        var self = this;

        self.save = function (tag) {
            if (!tag.hasOwnProperty('id')) {
                var highest = 1;
                for (var i = 0; i < self.tags.length; i++) {
                    if (self.tags[i].id > highest) highest = self.tags[i].id;
                }
                tag.id = ++highest;
            }
            self.tags.push(tag);

            return tag.id;
        };
        self.get = function (id) {
            for (var i = 0; i < self.tags.length; i++) {
                if (self.tags[i].id == id)
                    return self.tags[i];
            }
        };


        function createPersistentProperty(localName, storageName, Type) {
            var json = localStorage[storageName];

            self[localName] = json ? JSON.parse(json) : new Type;

            $rootScope.$watch(
                function () {
                    return self[localName];
                },
                function (value) {
                    if (value) {
                        localStorage[storageName] = JSON.stringify(value);
                    }
                },
                true);

        }
        
        createPersistentProperty('tags', 'ginkgoTags', Array);

        if (self.tags.length === 0) {
            self.save({id:1, text:'设计', done:true});
            self.save({id:2, text:'开发', done:true});            
            self.save({id:3, text:'测试', done:false});
            self.save({id:4, text:'部署', done:false});                        
        }
    }).service('events', function (localStorage, $rootScope) {
        var self = this;

        self.save = function (event) {
            if (!event.hasOwnProperty('id')) {
                var highest = 1;
                for (var i = 0; i < self.events.length; i++) {
                    if (self.events[i].id > highest) highest = self.events[i].id;
                }
                event.id = ++highest;
            }
            self.events.push(event);

            return event.id;
        };
        self.update = function (event) {
          console.log(event)
            for (var i = 0; i < self.events.length; i++) {
                if (self.events[i].id == event.id) {
                    if (event.text) {
                        self.events[i].text = event.text;
                    }
                    if (event.startTime) {
                        self.events[i].startTime = event.startTime;
                    }
                    if (event.endTime) {
                        self.events[i].endTime = event.endTime;
                    }

                }
                ;
            }
            return event.id;
        };
        self.get = function (id) {
            for (var i = 0; i < self.events.length; i++) {
                if (self.events[i].id == id)
                    return self.events[i];
            }
        };


        function createPersistentProperty(localName, storageName, Type) {
            var json = localStorage[storageName];

            self[localName] = json ? JSON.parse(json) : new Type;

            $rootScope.$watch(
                function () {
                    return self[localName];
                },
                function (value) {
                    if (value) {
                        localStorage[storageName] = JSON.stringify(value);
                    }
                },
                true);

        }
        
        createPersistentProperty('events', 'ginkgoEvents', Array);

        if (self.events.length === 0) {
            self.save({id:1, text:'设计', startTime: "2013-6-2", endTime: "2013-6-7",
                       members: [{name: "文举", startTime: "2013-6-3", endTime: "2013-6-6" },
                      {name: "彬彬", startTime: "2013-6-4", endTime: "2013-6-6" }]
            });
            self.save({id:2, text:'开发', startTime: "2013-6-8", endTime: "2013-6-28"});            
        }
    });

    ;

