
g	git	gst	git status
gl	git pull	gup	git fetch && git rebase
gp	git push	gc	git commit -v
gca	git commit -v -a	gco	git checkout
gcm	git checkout master	gb	git branch
gba	git branch -a	gcount	git shortlog -sn
gcp	git cherry-pick	glg	git log --stat --max-count=5
glgg	git log --graph --max-count=5	gss	git status -s
ga	git add	gm	git merge
grh	git reset HEAD	grhh	git reset HEAD --hard
gsr	git svn rebase	gsd	git svn dcommit
ggpull	git pull origin $(current_branch)	ggpush	git push origin $(current_branch)
gdv	git diff -w "$@" | view -
ggpnp	git pull origin $(current_branch) && git push origin $(current_branch)
git-svn-dcommit-push	git svn dcommit && git push github master:svntrunk
gpa	git add .; git commit -m "$1"; git push; # only in the ocodo fork.
