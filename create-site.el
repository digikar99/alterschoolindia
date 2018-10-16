(load "~/quicklisp/setup.lisp") ; requires quicklisp installed
;; See instructions here https://www.quicklisp.org/beta/
(ql:quickload 'lquery)
(ql:quickload 'str)
(ql:quickload 'cl-markup)

(use-package 'cl-markup)

;; Source: http://sodaware.sdf.org/notes/cl-read-file-into-string/
(defun file-get-contents (filename)
  (with-open-file (stream filename)
    (let ((contents (make-string (file-length stream))))
      (read-sequence contents stream)
      contents)))

(defvar main-files (directory "data/main/Social Science/*.html"))
(defvar footer-files (directory "data/footer/Social Science/*.html"))

;; (defvar main (file-get-contents (car main-files)))
;; (defvar footer (file-get-contents (car footer-files)))
(defvar out-folder "Social Science/")
(defvar page-questions (file-get-contents "data/header.html"))
(defvar pq-dom (lquery:$ (initialize page-questions)))
(defvar pq (lquery:$ ".page-question" (serialize)))
;(defvar main (lquery:$ (initialize main-contents) (serialize)))
;(defvar footer (lquery:$ (initialize footer-contents) (serialize)))

(setq *auto-escape* nil)     ; this permits the tags in main and
                                        ; footer to be evaluated
(defvar len (length page-questions))
(loop for i from 0 to len
      for main-file in main-files
      for footer-file in footer-files do
      (let* ((page-question (aref pq i))
             (main (file-get-contents main-file))
             (footer (file-get-contents footer-file))
             (outfile (str:join "" (list out-folder
                                          (file-namestring main-file))))
             
             (to-write
               (html5
                (:head
                 (:meta :charset "utf-8"
                        :name "viewport"
                        :content "width=device-width")
                 (:link :rel "stylesheet"
                        :href "../bootstrap-3.3.7-dist/css/bootstrap.min.css")
                 (:link :rel "stylesheet"
                        :href "../styles-bs.css")
                 (:title (file-namestring main-file)))
                (:body
                 (:nav :class "page-details"
                       (:div :class "container"
                             (:div :class "row"
                                   (:div :class "col-md-4 col-xs-3"
                                         :id "ahe_level"
                                         (:b :class "hidden-xs" "Level: ")
                                         "Level 0")
                                   (:div :class "col-md-4 col-xs-6"
                                         :id "ahe_topic"
                                         (:b :class "hidden-xs" "Topic: ")
                                         "Social Science")
                                   (:div :class "col-md-4 col-xs-3"
                                         :id "ahe_route"
                                         (:b  :class "hidden-xs" "Route Number: ")
                                         (format nil "~2,'0d" (+ i 1))))))
                 page-question
                 (:div :class "container"
                       (:div :class "row"
                             (:div :class "col-md-8 col-sm-7" main (:br) (:br))
                             (:div :class "col-md-4 col-sm-5" footer)))
                 (:div :class "visible-xs container-fluid" :id "bottom-bar"
                       (:div :class "row"
                             (:div :id "follow-question-btn" :class "col-xs-9"
                                   (:img :src "../Meta/question-circle-solid-red.png"
                                         :id "fa-question-circle")
                                   "Would you like to know?")
                             (:div :id "map-button" :class "col-xs-3"
                                   (:a :href "../Meta/List for Organized Study.html"
                                       (:img :src "../Meta/map-solid-red.png"
                                             :id "fa-map-solid")))))
                 (:script :src "../bootstrap-3.3.7-dist/jquery-3.2.1/jquery.min.js" "")
                 (:script :src "../bootstrap-3.3.7-dist/js/bootstrap.min.js" "")
                 (:script :src "../js-bs.js" "")))))
        (with-open-file (out outfile :direction :output
                                     :if-does-not-exist :create
                                     :if-exists :overwrite)
          (format out to-write))))
