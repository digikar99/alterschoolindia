(load "~/quicklisp/setup.lisp") ; requires quicklisp installed
;; See instructions here https://www.quicklisp.org/beta/
(ql:quickload 'lquery)
(ql:quickload 'str)

;; Source: http://sodaware.sdf.org/notes/cl-read-file-into-string/
(defun file-get-contents (filename)
  (with-open-file (stream filename)
    (let ((contents (make-string (file-length stream))))
      (read-sequence contents stream)
      contents)))

(defun pull-for-subjects (subject-list)
  (if (null subject-list)
      'done
      (let* ((infolder (str:join ""
                                 (list "../" (car subject-list))))
             (header-file (str:join ""
                                    (list "header/" (car subject-list) ".html")))
             (infiles (directory (str:join ""
                                           (list infolder "/" "*.html"))))
             (outfolder-main (str:join ""
                                       (list "main/" (car subject-list) "/")))
             (outfolder-footer (str:join ""
                                         (list "footer/" (car subject-list) "/"))))
        (with-open-file (header header-file :direction :output
                                            :if-exists :overwrite
                                            :if-does-not-exist :create)
          (loop for infile in infiles do
                (let* ((outfile-main (str:join ""
                                               (list outfolder-main
                                                     (file-namestring infile))))
                       (outfile-footer (str:join ""
                                                 (list outfolder-footer
                                                       (file-namestring infile))))
                       (contents (file-get-contents infile))
                       (dom (lquery:$ (initialize contents)))
                       (main-to-write (lquery:$ dom "main" (serialize)))
                       (footer-to-write (lquery:$ dom "footer" (serialize)))
                       (header-to-write (lquery:$ dom ".page-question" (serialize))))
                  (with-open-file (main outfile-main :direction :output
                                                     :if-exists :overwrite
                                                     :if-does-not-exist :create)
                    (if (> (length main-to-write) 0)
                        (format main (aref main-to-write 0))
                        NIL))
                  (with-open-file (footer outfile-footer :direction :output
                                                         :if-exists :overwrite
                                                         :if-does-not-exist :create)
                    (if (> (length footer-to-write) 0)
                        (format footer (aref footer-to-write 0))
                        NIL))
                  (if (> (length header-to-write) 0)
                      (format header (aref header-to-write 0))))))
        (pull-for-subjects (cdr subject-list)))))

(pull-for-subjects '("Social Science" "Information and Communication Technology" "Science"))


